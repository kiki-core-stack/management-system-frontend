#!/bin/bash

set -e

cd "$(realpath "$(dirname "$(readlink -f "$0")")")"

# Load environments
. ./.env.production.local

# Pull images
docker pull kikikanri/node:22-slim &
docker pull node:22-slim &
wait

# Build and run
docker build \
    -t "$DOCKER_IMAGE_TAG" \
    --build-arg "NPM_REGISTRY=$NPM_REGISTRY" \
    .

docker stop "$DOCKER_CONTAINER_NAME" || true
docker rm "$DOCKER_CONTAINER_NAME" || true
docker run \
    -d \
    -p "$DOCKER_CONTAINER_EXPOSE_HOST:$DOCKER_CONTAINER_EXPOSE_PORT:3000" \
    -v "$DOCKER_CONTAINER_STATIC_DIR_BIND_PATH:/static" \
    --name "$DOCKER_CONTAINER_NAME" \
    --restart=always \
    "$DOCKER_IMAGE_TAG"
