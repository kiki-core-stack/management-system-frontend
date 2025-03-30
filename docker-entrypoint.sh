#!/bin/sh

set -e

# Copy static files and set permissions
static_dir_path='/static'
rm -rf "$static_dir_path"/*
cp -r /app/public/* "$static_dir_path"/
find "$static_dir_path" -type d -exec chmod 755 {} +
find "$static_dir_path" -type f -exec chmod 644 {} +
