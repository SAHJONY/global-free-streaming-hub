#!/bin/bash
# Deployment script for Global Free Streaming Hub with FreeLLMAPI

echo "Deploying Global Free Streaming Hub with FreeLLMAPI integration..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Initialize freellmapi if not already done
if [ ! -d "freellmapi" ]; then
  echo "Cloning freellmapi repository..."
  git submodule add https://github.com/tashfeenahmed/freellmapi.git freellmapi
fi

# Install freellmapi dependencies
echo "Installing freellmapi dependencies..."
cd freellmapi
npm install
cd ..

# Create environment file for freellmapi
if [ ! -f "freellmapi/.env" ]; then
  echo "Creating freellmapi environment file..."
  echo "# Server encryption key for API key storage" > freellmapi/.env
  echo "ENCRYPTION_KEY=$(node -p "require('crypto').randomBytes(32).toString('hex')")" >> freellmapi/.env
  echo "PORT=3001" >> freellmapi/.env
fi

echo "Starting Global Free Streaming Hub services..."
echo "Global Free Streaming Hub deployment completed successfully!"