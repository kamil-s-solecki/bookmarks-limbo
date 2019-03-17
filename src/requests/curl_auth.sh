#!/bin/bash
TOKEN=$(cat tokens/access)
curl -H "Authorization: Bearer $TOKEN" $@
