#!/bin/sh
set -e

if [ "${1#-}" != "${1}" ] || [ -z "$(command -v "${1}")" ]; then
  set -- node "$@"
fi

chown -R node:node /workdir/*
ls -l /workdir

exec "$@"
