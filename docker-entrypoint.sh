#!/bin/sh

set -eu

# Copy static files and set permissions
STATIC_DIR_PATH='/static'
rm -rf "${STATIC_DIR_PATH}"/*
cp -r /app/public/* "${STATIC_DIR_PATH}"/
find "${STATIC_DIR_PATH}" -type d -exec chmod 755 {} +
find "${STATIC_DIR_PATH}" -type f -exec chmod 644 {} +
