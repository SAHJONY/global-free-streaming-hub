#!/bin/bash

# GitHub Deployment Script for Global Free Streaming Hub

echo "Deploying Global Free Streaming Hub to GitHub..."

# Initialize git repository
git init
git add .
git commit -m "Initial commit: Global Free Streaming Hub v2.0"

echo "Repository initialized. Please create a new repository on GitHub and follow the instructions to push."
echo "Run the following commands to push to GitHub:"
echo "git remote add origin https://github.com/yourusername/global-free-streaming-hub.git"
echo "git branch -M main"
echo "git push -u origin main"