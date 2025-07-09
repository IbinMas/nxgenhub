# Stage 1: Build frontend
FROM node:18-slim AS frontend-builder

WORKDIR /app

# Copy frontend package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy all project files (excluding backend via Docker ignore or explicit removal)
COPY . .
RUN rm -rf server

# Build frontend
RUN npm run build

# Stage 2: Build backend
FROM node:18-slim AS backend-builder

WORKDIR /app/server

# Copy backend package files
COPY server/package*.json ./

# Install backend production dependencies
RUN npm install --omit=dev

# Install necessary type definitions for TypeScript
RUN npm install --save-dev \
    @types/node \
    @types/express \
    @types/cors \
    @types/nodemailer \
    @types/pg

# Install TypeScript globally
RUN npm install -g typescript

# Copy backend source code
COPY server/. .

# Compile TypeScript
RUN npm run build

# Stage 3: Production runtime
FROM node:18-slim AS production

# Install base utilities
RUN apt-get update && apt-get install -y dumb-init curl && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN groupadd -g 1001 nodejs && useradd -u 1001 -g nodejs -m nextjs

WORKDIR /app

# Copy built frontend
COPY --from=frontend-builder --chown=nextjs:nodejs /app/dist ./dist

# Copy built backend
COPY --from=backend-builder --chown=nextjs:nodejs /app/server/dist ./server/dist
COPY --from=backend-builder --chown=nextjs:nodejs /app/server/node_modules ./server/node_modules
COPY --chown=nextjs:nodejs server/package.json ./server/package.json

# Copy environment file
COPY --chown=nextjs:nodejs .env ./

# Set environment variables
ENV PORT=3000

# Install `serve` for static frontend
RUN npm install -g serve@14.2.1

# Startup script
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'PORT=${PORT:-3000}' >> /app/start.sh && \
    echo 'BACKEND_PORT=${BACKEND_PORT:-4000}' >> /app/start.sh && \
    echo 'echo "🚀 Starting NxtgenHub Application..."' >> /app/start.sh && \
    echo 'echo "📁 Frontend files: $(ls -la /app/dist 2>/dev/null | wc -l) files"' >> /app/start.sh && \
    echo 'echo "📁 Backend files: $(ls -la /app/server/dist 2>/dev/null | wc -l) files"' >> /app/start.sh && \
    echo 'cd /app/server && PORT=$BACKEND_PORT node dist/index.js &' >> /app/start.sh && \
    echo 'BACKEND_PID=$!' >> /app/start.sh && \
    echo 'sleep 5' >> /app/start.sh && \
    echo 'echo "🌐 Serving frontend on port $PORT"' >> /app/start.sh && \
    echo 'cd /app && serve -s dist -l tcp://0.0.0.0:$PORT --single' >> /app/start.sh && \
    chmod +x /app/start.sh

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["/app/start.sh"]
