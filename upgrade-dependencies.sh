#!/bin/bash

cd "$(realpath "$(dirname "$(readlink -f "$0")")")" || exit 1

. ./.env.development.local
export NPM_CONFIG_REGISTRY

rm -rf ./.nuxt
[[ " $@ " =~ ' -c ' ]] && rm -rf ./node_modules ./pnpm-lock.yaml

pnpm upgrade -L
pnpm run postinstall
./modify-files-permissions.sh
