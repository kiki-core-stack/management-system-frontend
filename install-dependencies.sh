#!/bin/bash

. ./.env.development.local
export NPM_CONFIG_REGISTRY

set -e

pnpm i
./modify-files-permissions.sh
