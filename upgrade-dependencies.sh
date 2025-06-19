#!/bin/bash

set -e

SCRIPT_DIR="$(dirname "$(realpath "${BASH_SOURCE[0]}")")"
cd "${SCRIPT_DIR}"

set +e

. ./.env.development.local
export NPM_CONFIG_REGISTRY

rm -rf ./.nuxt
[[ " $@ " =~ ' -c ' ]] && rm -rf ./node_modules ./pnpm-lock.yaml

pnpm upgrade -L
pnpm run postinstall
./modify-files-permissions.sh
