#!/usr/bin/env bash
cd "$(dirname "$0")"
gunicorn app:app --bind 0.0.0.0:$PORT