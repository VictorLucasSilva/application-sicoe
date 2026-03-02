# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Build arguments (variáveis de ambiente para o build)
ARG VITE_API_BASE_URL
ARG VITE_ENV=production

# Passa as variáveis para o Vite durante o build
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_ENV=${VITE_ENV}

# Copy package files
COPY package*.json ./

# Install dependencies (incluindo devDependencies para o build)
RUN npm ci

# Copy source code
COPY . .

# Build application (usa as variáveis de ambiente)
RUN npm run build

# Production stage
FROM nginx:alpine

# Install wget for healthcheck
RUN apk add --no-cache wget

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Security: Run as non-root user
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80 || exit 1

CMD ["nginx", "-g", "daemon off;"]
