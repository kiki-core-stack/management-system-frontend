# syntax=docker/dockerfile:labs

# Build stage
FROM kikikanri/node:22-slim AS build-stage

## Set args, envs and workdir
ARG NPM_CONFIG_REGISTRY
ENV NODE_ENV=production \
    NPM_CONFIG_REGISTRY=$NPM_CONFIG_REGISTRY

WORKDIR /app

## Upgrade packages
RUN apt-get update && \
    apt-get upgrade -y

## Install dependencies
COPY ./.npmrc ./package.json ./pnpm-lock.yaml ./
RUN --mount=id=pnpm-store,target=/pnpm/store,type=cache pnpm i --frozen-lockfile --prod=false

## Copy files and build
COPY --exclude=./docker-entrypoint.sh ./ ./
RUN pnpm run lint && \
    pnpm run build

# Runtime stage
FROM node:22-slim

## Set envs and workdir
ENV NODE_ENV=production \
    TZ=Asia/Taipei

WORKDIR /app

## Upgrade, install packages and set timezone
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends tini tzdata && \
    ln -snf "/usr/share/zoneinfo/$TZ" /etc/localtime && \
    echo $TZ > /etc/timezone && \
    apt-get autoremove -y --purge && \
    apt-get clean && \
    rm -rf /var/cache/apt/* /var/lib/apt/lists/*

## Copy files and libraries
COPY --from=build-stage /app/.output ./

## Copy and set the entrypoint script
COPY ./docker-entrypoint.sh ./
ENTRYPOINT ["tini", "--"]
CMD ["./docker-entrypoint.sh"]
