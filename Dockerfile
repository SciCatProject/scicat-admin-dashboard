# This Dockerfile uses `serve` npm package to serve the static files with node process.
# You can find the Dockerfile for nginx in the following link:
# https://github.com/refinedev/dockerfiles/blob/main/vite/Dockerfile.nginx
FROM refinedev/node:18 AS base

FROM base as deps
COPY package*.json package-lock.json* ./
RUN npm ci

FROM base as builder
COPY --from=deps /app/refine/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base as runner
ENV NODE_ENV develop
RUN npm install -g serve
COPY --from=builder /app/refine/dist ./
USER refine
EXPOSE 5173

CMD ["serve", "-s", ".", "-l", "5173"]
