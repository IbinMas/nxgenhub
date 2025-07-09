# Stage 1: Build backend
FROM node:18-slim AS backend-builder

WORKDIR /app

# Copy backend package files
COPY package*.json ./

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
COPY . .

# Compile TypeScript
RUN npm run build

# Stage 2: Production runtime for server
FROM node:18-slim AS production

# Install base utilities
RUN apt-get update && apt-get install -y dumb-init curl && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN groupadd -g 1001 nodejs && useradd -u 1001 -g nodejs -m nextjs

WORKDIR /app

# Copy built backend
COPY --from=backend-builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=backend-builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs package.json ./package.json

# Copy environment file
COPY --chown=nextjs:nodejs .env ./

# Set environment variables
ENV PORT=3001

# Startup script
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'PORT=${PORT:-3001}' >> /app/start.sh && \
    echo 'echo "🚀 Starting NxtgenHub Server..."' >> /app/start.sh && \
    echo 'echo "📁 Backend files: $(ls -la /app/dist 2>/dev/null | wc -l) files"' >> /app/start.sh && \
    echo 'cd /app && PORT=$PORT node dist/index.js' >> /app/start.sh && \
    chmod +x /app/start.sh

USER nextjs

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["/app/start.sh"]
