# Multi-stage build for production deployment
# Stage 1: Build dependencies and client
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install system dependencies for building native modules
RUN apk add --no-cache python3 make g++ 

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./
COPY components.json ./
COPY drizzle.config.ts ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY client/ ./client/
COPY server/ ./server/
COPY shared/ ./shared/

# Build the client application
RUN npm run build

# Stage 2: Production runtime
FROM node:18-alpine AS runtime

# Install security updates and create non-root user
RUN apk update && apk upgrade && \
    addgroup -g 1001 -S nodejs && \
    adduser -S synexian -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/shared ./shared

# Copy additional config files needed at runtime
COPY --from=builder /app/drizzle.config.ts ./

# Create necessary directories and set permissions
RUN mkdir -p /app/logs && \
    chown -R synexian:nodejs /app

# Switch to non-root user
USER synexian

# Expose port (will be set by Cloud Run, defaults to 8080)
EXPOSE 8080

# Add health check (use dynamic port from environment)
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "const http = require('http'); \
                 const port = process.env.PORT || 8080; \
                 const options = { host: 'localhost', port: port, path: '/api/health', timeout: 2000 }; \
                 const req = http.request(options, (res) => { \
                   if (res.statusCode === 200) process.exit(0); \
                   else process.exit(1); \
                 }); \
                 req.on('error', () => process.exit(1)); \
                 req.end();"

# Set production environment
ENV NODE_ENV=production

# Start the application
CMD ["node", "dist/index.js"]