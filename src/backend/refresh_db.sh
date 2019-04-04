#!/bin/bash
python bookmarkslimbo/manage.py flush && \
python bookmarkslimbo/manage.py loaddata bookmarkslimbo/fixtures/initial_data.json
