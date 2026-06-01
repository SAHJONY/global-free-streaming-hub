#!/bin/bash
# Script to start freellmapi with Hermes Agent integration

# Start freellmapi server
cd ~/global-free-streaming-hub/freellmapi
echo "Starting freellmapi server..."

# Generate encryption key if not exists
if [ ! -f .env ]; then
  echo "Creating .env file with encryption key..."
  echo "# Server encryption key for API key storage" > .env
  echo "ENCRYPTION_KEY=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")" >> .env
  echo "PORT=3001" >> .env
fi

# Start the freellmapi server
echo "Starting freellmapi server on port 3001..."
npm run dev