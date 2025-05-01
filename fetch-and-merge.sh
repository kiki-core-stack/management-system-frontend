#!/bin/bash

set -e

cd "$(realpath "$(dirname "$(readlink -f "$0")")")"

git fetch https://github.com/kiki-core-stack/admin-frontend main
git merge FETCH_HEAD
