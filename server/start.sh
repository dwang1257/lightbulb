cd "$(dirname "$0")"
gunicorn generate-ideas:app --bind 0.0.0.0:$PORT