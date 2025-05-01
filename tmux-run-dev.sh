#!/bin/bash

set -e

cd "$(realpath "$(dirname "$(readlink -f "$0")")")"

name='kiki-core-stack-admin-frontend'

if ! tmux ls | grep -q "^$name:"; then
    tmux new-session -ds "$name"
    tmux send-keys -t "$name" 'pnpm run dev' C-m
fi
