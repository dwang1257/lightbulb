#!/usr/bin/env bash
gunicorn generate-ideas:app --bind 0.0.0.0:$PORT 

