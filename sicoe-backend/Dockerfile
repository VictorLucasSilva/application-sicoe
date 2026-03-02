# Stage 1: Build
FROM node:22.21.0-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies) for build
RUN npm ci && npm cache clean --force

# Copy source code
COPY . .

# Build application
RUN npm run build

# Stage 2: Production
FROM node:22.21.0-alpine

WORKDIR /app

# Copy package files and install production dependencies + CLI tools for migrations
COPY package*.json ./
RUN npm ci --only=production && \
    npm install -g ts-node typeorm && \
    npm cache clean --force

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Copy source files needed for migrations and seeds
COPY --from=builder /app/src/data-source.ts ./src/data-source.ts
COPY --from=builder /app/src/database ./src/database
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Copy entrypoint script
COPY docker-entrypoint.sh /app/docker-entrypoint.sh

# Create non-root user and set permissions
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 && \
    chown -R nestjs:nodejs /app && \
    chmod +x /app/docker-entrypoint.sh

USER nestjs

EXPOSE 3000

CMD ["/app/docker-entrypoint.sh"]
