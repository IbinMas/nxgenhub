# Stage 1: Build backend
FROM node:18-slim AS backend-builder

WORKDIR /app
ENV SKIP_POSTINSTALL=true

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Copy Prisma schema
COPY prisma ./prisma

# Copy env file if needed before prisma generate
COPY .env .env

# Generate Prisma client
RUN npx prisma generate

# Compile TypeScript
RUN npm run build

# Prune dev dependencies
RUN npm prune --production

# Stage 2: Production runtime
FROM node:18-slim AS production

RUN apt-get update && apt-get install -y dumb-init curl && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN groupadd -g 1001 nodejs && useradd -u 1001 -g nodejs -m nextjs

WORKDIR /app

# Copy artifacts from builder
COPY --from=backend-builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=backend-builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=backend-builder --chown=nextjs:nodejs /app/package.json ./package.json

# Copy env file (optional if Compose handles it)
COPY --chown=nextjs:nodejs .env ./

ENV PORT=3001

# Startup script
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'PORT=${PORT:-3001}' >> /app/start.sh && \
    echo 'echo "🚀 Starting NxtgenHub Server..."' >> /app/start.sh && \
    echo 'cd /app && PORT=$PORT node dist/index.js' >> /app/start.sh && \
    chmod +x /app/start.sh

USER nextjs

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["/app/start.sh"]
