#!/bin/bash

set -e
. ./.env.production.local
container_name='nuxt-project'
bind_port='127.0.0.1:3000'
image_tag='user/nuxt-project:latest'
static_dir_bind_path='/data/web/nuxt-project/static'

docker pull kikikanri/node:22-slim &
docker pull node:22-slim &
wait
docker build \
    -t "$image_tag" \
    --build-arg "NPM_REGISTRY=$NPM_REGISTRY" \
    .

docker kill "$container_name" || true
docker rm "$container_name" || true
docker run \
    -itd \
    -p "$bind_port:3000" \
    -v "$static_dir_bind_path:/static" \
    --name "$container_name" \
    --restart=always \
    "$image_tag"
