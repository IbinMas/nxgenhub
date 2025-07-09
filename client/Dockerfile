# Stage 1: Build frontend
FROM node:18-slim AS frontend-builder

WORKDIR /app

# Copy frontend package files and install dependencies
COPY package*.json .
RUN npm install --legacy-peer-deps

# Copy all project files
COPY . .

# Build frontend
RUN npm run build

# Stage 2: Production runtime for client
FROM node:18-slim AS production

# Install base utilities
RUN apt-get update && apt-get install -y dumb-init curl && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN groupadd -g 1001 nodejs && useradd -u 1001 -g nodejs -m nextjs

WORKDIR /app

# Copy built frontend
COPY --from=frontend-builder --chown=nextjs:nodejs /app/dist ./dist

# Install `serve` for static frontend
RUN npm install -g serve@14.2.1

# Startup script
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'PORT=${PORT:-3000}' >> /app/start.sh && \
    echo 'echo "🚀 Starting NxtgenHub Client..."' >> /app/start.sh && \
    echo 'echo "📁 Frontend files: $(ls -la /app/dist 2>/dev/null | wc -l) files"' >> /app/start.sh && \
    echo 'cd /app && serve -s dist -l tcp://0.0.0.0:$PORT --single' >> /app/start.sh && \
    chmod +x /app/start.sh

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["/app/start.sh"]
