#!/bin/bash

set -e
git fetch https://github.com/kiki-core-stack/admin-frontend main
git merge FETCH_HEAD
