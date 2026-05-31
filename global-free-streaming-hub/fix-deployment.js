#!/usr/bin/env node

/**
 * Deployment Fix Tool for Global Free Streaming Hub
 * Fixes common Vercel deployment issues
 */

const fs = require('fs');
const path = require('path');

class DeploymentFixer {
  constructor() {
    this.projectDir = process.cwd();
  }

  // Check if index.html exists
  checkIndexFile() {
    const indexPath = path.join(this.projectDir, 'index.html');
    if (!fs.existsSync(indexPath)) {
      console.log('❌ index.html not found');
      return false;
    }
    console.log('✅ index.html found');
    return true;
  }

  // Fix vercel.json configuration
  fixVercelConfig() {
    const config = {
      "version": 2,
      "builds": [
        {
          "src": "index.html",
          "use": "@vercel/static"
        }
      ],
      "routes": [
        {
          "src": "/(.*)",
          "dest": "/index.html"
        }
      ]
    };

    fs.writeFileSync('vercel.json', JSON.stringify(config, null, 2));
    console.log('✅ Fixed vercel.json configuration');
  }

  // Create a simple index.html if it doesn't exist
  createIndexFile() {
    const indexPath = path.join(this.projectDir, 'index.html');
    if (!fs.existsSync(indexPath)) {
      const content = `<!DOCTYPE html>
<html>
<head>
    <title>Global Free Streaming Hub</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <h1>Global Free Streaming Hub</h1>
    <p>Advanced AI-powered streaming platform with cinematic quality</p>
</body>
</html>`;
      
      fs.writeFileSync(indexPath, content);
      console.log('✅ Created index.html');
    }
  }

  // Fix HTML file issues
  fixHtmlFiles() {
    const files = fs.readdirSync(this.projectDir).filter(file => file.endsWith('.html'));
    
    files.forEach(file => {
      const filePath = path.join(this.projectDir, file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Remove any extraneous closing tags
      content = content.replace(/<\/file>/g, '');
      
      // Ensure proper HTML structure
      if (!content.includes('<!DOCTYPE html>')) {
        content = `<!DOCTYPE html>\n${content}`;
      }
      
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed ${file}`);
    });
  }

  // Run all fixes
  run() {
    console.log('🔧 Running Deployment Fix Tool...');
    
    this.fixVercelConfig();
    this.createIndexFile();
    this.fixHtmlFiles();
    
    console.log('✅ Deployment fixes completed!');
    console.log('🔄 Please redeploy your project on Vercel');
  }
}

// Run the tool
const fixer = new DeploymentFixer();
fixer.run();