# syntax=docker/dockerfile:labs

# Build stage
FROM kikikanri/node:24-alpine AS build-stage

## Set args, envs and workdir
ARG NPM_CONFIG_REGISTRY
ENV NODE_ENV='production' \
    NPM_CONFIG_REGISTRY="${NPM_CONFIG_REGISTRY}"

WORKDIR /app

## Upgrade packages
RUN apk update && \
    apk upgrade

## Copy package-related files and install dependencies
COPY ./.npmrc ./package.json ./pnpm-lock.yaml ./
RUN --mount=id=pnpm-store,target=/pnpm/store,type=cache pnpm i --frozen-lockfile --prod=false

## Copy source files and build-related files, then build the app
COPY --exclude=./docker-entrypoint.sh ./ ./
RUN pnpm run lint && \
    pnpm run typecheck && \
    pnpm run generate

# Runtime stage
FROM busybox:latest

## Set workdir
WORKDIR /app

## Copy files and libraries
COPY --from=build-stage /app/.output ./

## Copy and set the entrypoint script
COPY --chmod=700 ./docker-entrypoint.sh ./
CMD ["./docker-entrypoint.sh"]
