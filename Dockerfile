# ---- Build stage -------------------------------------------------------
FROM node:22-slim AS build

WORKDIR /app

# Install all deps (including dev) so tsc is available for the build step
COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src
RUN npx tsc

# ---- Runtime stage -------------------------------------------------------
FROM node:22-slim AS runtime

ENV NODE_ENV=production
WORKDIR /app

# Install production deps only — smaller image, no tsc/vitest/etc. inside
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Compiled output from the build stage
COPY --from=build /app/dist ./dist

# Runtime assets the app reads directly from disk (not compiled by tsc)
COPY openapi.yaml ./openapi.yaml
COPY drizzle ./drizzle

# keys/ is intentionally NOT copied here — see .dockerignore and README.
# It must be mounted as a volume at container start, e.g.:
#   docker run -v $(pwd)/keys:/app/keys ...
# so private key material never lands inside an image layer.

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://localhost:8000/healthz').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

EXPOSE 8000

CMD ["node", "dist/server.js"]