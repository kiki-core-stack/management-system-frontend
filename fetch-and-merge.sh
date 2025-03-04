#!/bin/bash

set -e
git fetch https://github.com/kiki-kanri/nuxt-template main
git merge FETCH_HEAD
