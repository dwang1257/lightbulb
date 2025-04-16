#!/usr/bin/env bash
gunicorn server.generate-ideas:app --bind 0.0.0.0:$PORT --workers 1

