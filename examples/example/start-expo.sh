#!/bin/bash

# Try to start Expo on port 8081, if it's busy, try 8082, etc.
PORT=8081
MAX_ATTEMPTS=5
ATTEMPT=0

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
  if lsof -ti:$PORT > /dev/null 2>&1; then
    echo "Port $PORT is in use, trying next port..."
    PORT=$((PORT + 1))
    ATTEMPT=$((ATTEMPT + 1))
  else
    break
  fi
done

if [ $ATTEMPT -eq $MAX_ATTEMPTS ]; then
  echo "Could not find an available port after $MAX_ATTEMPTS attempts"
  exit 1
fi

echo "Starting Expo on port $PORT"
exec npx expo start --port $PORT

