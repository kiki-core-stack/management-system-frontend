# Build stage
FROM kikikanri/node22:base-alpine AS build-stage

## Set args, envs and workdir
ARG NPMRC_REGISTRY
ENV NPMRC_REGISTRY=${NPMRC_REGISTRY}
WORKDIR /app

## Install packages
COPY ./.npmrc ./package.json ./pnpm-lock.yaml ./
RUN --mount=id=pnpm-store,target=/pnpm/store,type=cache pnpm i --frozen-lockfile

## Set production env
ENV NODE_ENV=production

## Copy files and build
COPY ./ ./
RUN pnpm run generate

# Runtime stage
FROM busybox:latest

## Set args, envs and workdir
ENV DIST_DIR_PATH=/frontend-dist
WORKDIR /app

## Copy files
COPY --from=build-stage /app/.output ./

## Make entrypoint and set cmd
RUN echo "rm -rf ${DIST_DIR_PATH}/* && cp -pr /app/public/* ${DIST_DIR_PATH} && chmod 755 ${DIST_DIR_PATH} -R" > /entrypoint.sh
CMD ["sh", "/entrypoint.sh"]
