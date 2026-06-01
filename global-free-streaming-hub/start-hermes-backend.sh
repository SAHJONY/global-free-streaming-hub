#!/bin/bash
# Startup script for Global Free Streaming Hub with Hermes Agent

echo "Starting Global Free Streaming Hub with Hermes Agent integration..."

# Install backend dependencies
cd ~/global-free-streaming-hub/backend
npm install

# Start the backend server
node server.js