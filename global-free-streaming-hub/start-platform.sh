#!/bin/bash
# Startup script for Global Free Streaming Hub with FreeLLMAPI integration

echo "Starting Global Free Streaming Hub with FreeLLMAPI integration..."

# Start FreeLLMAPI service
echo "Starting FreeLLMAPI service..."
cd ~/global-free-streaming-hub/freellmapi
npm install
npm run build

# Start the backend server
echo "Starting Hermes Agent backend with FreeLLMAPI integration..."
cd ~/global-free-streaming-hub/backend
npm install
node server.js &

echo "Global Free Streaming Hub backend services started successfully!"
echo "FreeLLMAPI is now the main API key provider for the platform."