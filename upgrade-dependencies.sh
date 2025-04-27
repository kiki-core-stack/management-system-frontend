#!/bin/bash

set -e
. ./.env.development.local
export NPM_CONFIG_REGISTRY

set -e

[[ " $@ " =~ ' -c ' ]] && rm -rf ./node_modules ./pnpm-lock.yaml

pnpm upgrade -L
./modify-files-permissions.sh
