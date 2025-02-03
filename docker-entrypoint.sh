#!/bin/sh

set -e
dist_dir_path='/admin-frontend-dist'
rm -rf "$dist_dir_path"/*
cp -r /app/public/* "$dist_dir_path"/
find $dist_dir_path -type d -exec chmod 755 {} +
find $dist_dir_path -type f -exec chmod 644 {} +
