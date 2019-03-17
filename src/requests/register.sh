#!/bin/bash
curl -X POST -H "Content-Type: application/json" --data "{ \"username\": \"$1\", \"email\": \"$2\", \"password\": \"$3\" }" localhost:8000/api/users/
