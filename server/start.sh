#!/bin/bash
gunicorn generate-ideas:app --bind 0.0.0.0:$PORT

chmod +x server/start.sh