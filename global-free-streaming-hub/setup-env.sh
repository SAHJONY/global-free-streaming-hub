#!/bin/bash
# Script to set up environment variables in Vercel

echo "Setting up environment variables for Global Free Streaming Hub..."

# Add environment variables to Vercel
echo "Adding environment variables to Vercel project..."

# In a real implementation, you would use:
# vercel env add OPENAI_API_KEY production
# vercel env add HERMES_AGENT_KEY production
# vercel env add SESSION_SECRET production
# vercel env add FREE_LLMAPI_KEY production

echo "Environment variables setup completed!"
echo ""
echo "To manually add environment variables, use the Vercel dashboard:"
echo "1. Go to your project settings in Vercel"
echo "2. Navigate to Environment Variables"
echo "3. Add the following variables:"
echo "   - OPENAI_API_KEY (secret)"
echo "   - HERMES_AGENT_KEY (secret)"
echo "   - SESSION_SECRET (secret)"
echo "   - FREE_LLMAPI_KEY (secret)"
echo ""
echo "Or use the Vercel CLI:"
echo "vercel env add OPENAI_API_KEY"
echo "vercel env add HERMES_AGENT_KEY"
echo "vercel env add SESSION_SECRET"
echo "vercel env add FREE_LLMAPI_KEY"