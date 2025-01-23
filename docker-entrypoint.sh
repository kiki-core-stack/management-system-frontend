#!/bin/sh

set -e
dist_dir_path='/admin-frontend-dist'
find $dist_dir_path -mindepth 1 -maxdepth 1 -exec rm -rf {} +
find /app/public -mindepth 1 -maxdepth 1 -exec cp -pr {} "$dist_dir_path"/ +
find $dist_dir_path -type d -exec chmod 755 {} +
find $dist_dir_path -type f -exec chmod 644 {} +
