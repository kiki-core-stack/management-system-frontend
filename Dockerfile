# Build stage
FROM kikikanri/node22:base-alpine AS build-stage

## Set args, envs and workdir
ARG NPM_CONFIG_REGISTRY
ENV NODE_ENV=production \
    NPM_CONFIG_REGISTRY=$NPM_CONFIG_REGISTRY

WORKDIR /app

## Install dependencies
COPY ./.npmrc ./package.json ./pnpm-lock.yaml ./
RUN --mount=id=pnpm-store,target=/pnpm/store,type=cache pnpm i --frozen-lockfile --prod=false

## Copy files and generate
COPY ./ ./
RUN pnpm run lint && pnpm run generate

# Runtime stage
FROM busybox:latest

## Set workdir
WORKDIR /app

## Copy files
COPY --from=build-stage /app/.output ./

## Copy and set the entrypoint script
COPY ./docker-entrypoint.sh ./
ENTRYPOINT ["./docker-entrypoint.sh"]
