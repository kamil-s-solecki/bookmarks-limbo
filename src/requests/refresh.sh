#!/bin/bash
REFRESH_TOKEN=$(cat tokens/refresh)

RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" --data "{ \"refresh\": \"$REFRESH_TOKEN\" }" localhost:8000/api/token/refresh/)

if [[ "$RESPONSE" =~ "access" ]]; then
  echo $RESPONSE | jq -r '.access' > tokens/access
else
  echo $RESPONSE
  echo "REFRESH FAILED :("
fi
