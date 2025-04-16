#!/usr/bin/env bash
cd /opt/render/project/src
gunicorn generate-ideas:app --bind 0.0.0.0:$PORT --workers 1

