#!/bin/sh

set -e

# Copy static files and set permissions
static_dir_path='/static'
rm -rf "${static_dir_path}"/*
cp -r /app/public/* "${static_dir_path}"/
find "${static_dir_path}" -type d -exec chmod 755 {} +
find "${static_dir_path}" -type f -exec chmod 644 {} +

# Load secrets to environment
if [ -d /run/secrets ]; then
    for secret_file_path in /run/secrets/*; do
        [ ! -f "${secret_file_path}" ] && continue
        secret_key=$(basename "${secret_file_path}")
        secret_value=$(cat "${secret_file_path}")
        export "${secret_key}"="${secret_value}"
    done
fi

# Start server
cd /app/server
exec node ./index.mjs
