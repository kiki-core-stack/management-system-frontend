#!/bin/bash

. ./.env.development.local
export NPM_CONFIG_REGISTRY

set -e

pnpm upgrade -L
./modify-files-permissions.sh
