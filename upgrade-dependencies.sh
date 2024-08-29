#!/bin/bash

. ./.env.development.local
export NPMRC_REGISTRY=$NPMRC_REGISTRY
pnpm upgrade -L
pnpm add cheerio@1.0.0-rc.12
pnpm add -D vue-tsc@2.0
