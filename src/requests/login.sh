#!/bin/bash
USERNAME=$1
PASS=$2

RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" --data "{ \"username\": \"$USERNAME\", \"password\": \"$PASS\" }" localhost:8000/api/token/)

if [[ "$RESPONSE" =~ "access" ]]; then
  echo $RESPONSE | jq -r '.access' > tokens/access
  echo $RESPONSE | jq -r '.refresh' > tokens/refresh
else
  echo $RESPONSE
  echo "AUTH FAILED :("
fi
