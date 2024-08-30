#!/bin/bash

. ./.env.development.local
export NPMRC_REGISTRY=$NPMRC_REGISTRY
pnpm upgrade -L
pnpm add -D vue-tsc@2.0
