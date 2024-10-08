#!/usr/bin/env bash

set -e

host="$1"
shift
cmd="$@"

until mysql -h "$host" -uroot -pAzerty+123 &> /dev/null
do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "MySQL is up - executing command"
exec $cmd
