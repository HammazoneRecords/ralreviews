# RAL Reviews — Next.js + Better Auth + Drizzle + Postgres (DeepSeek via Ark)

# Stage 1: build
FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# Stage 2: production
FROM node:22-alpine
WORKDIR /app
RUN corepack enable
ENV NODE_ENV=production
ENV PORT=3010
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
RUN pnpm install --frozen-lockfile --prod
EXPOSE 3010
CMD ["pnpm", "start"]
