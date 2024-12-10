#!/bin/bash

set -e
. ./.env.development.local
export NPM_CONFIG_REGISTRY
pnpm upgrade -L
