#!/bin/bash

set -e

cd "$(realpath "$(dirname "$(readlink -f "$0")")")"

# Load and set variables
. ./.env.production.local
author='user'
base_name='nuxt-project'
container_name="$base_name"
bind_address='127.0.0.1:3000'
image_tag="$author/$base_name:latest"
static_dir_bind_path='/data/web/nuxt-project/static'

# Pull images
docker pull kikikanri/node:22-slim &
docker pull node:22-slim &
wait

# Build and run
docker build \
    -t "$image_tag" \
    --build-arg "NPM_REGISTRY=$NPM_REGISTRY" \
    .

docker stop "$container_name" || true
docker rm "$container_name" || true
docker run \
    -itd \
    -p "$bind_address:3000" \
    -v "$static_dir_bind_path:/static" \
    --name "$container_name" \
    --restart=always \
    "$image_tag"
