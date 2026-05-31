#!/usr/bin/env node

/**
 * Global Free Streaming Hub Deployment Fix Tool
 * Automatically fixes common deployment issues with Vercel and static sites
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class DeploymentFixer {
  constructor() {
    this.projectDir = process.cwd();
    this.config = {
      htmlFiles: ['index.html'],
      configFiles: ['vercel.json', 'package.json'],
      requiredFiles: ['index.html'],
      backupDir: '.backup'
    };
  }

  // Check if required files exist
  checkRequiredFiles() {
    console.log('🔍 Checking required files...');
    const missingFiles = [];
    
    this.config.requiredFiles.forEach(file => {
      const filePath = path.join(this.projectDir, file);
      if (!fs.existsSync(filePath)) {
        missingFiles.push(file);
      }
    });
    
    if (missingFiles.length > 0) {
      console.log(`❌ Missing files: ${missingFiles.join(', ')}`);
      return false;
    }
    
    console.log('✅ All required files found');
    return true;
  }

  // Fix HTML file structure issues
  fixHtmlFiles() {
    console.log('🔧 Fixing HTML file structure...');
    
    this.config.htmlFiles.forEach(file => {
      const filePath = path.join(this.projectDir, file);
      if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove any extraneous closing tags
        content = content.replace(/<\/file>/g, '');
        
        // Ensure proper HTML structure
        if (!content.includes('<!DOCTYPE html>')) {
          content = `<!DOCTYPE html>\n${content}`;
        }
        
        // Ensure proper closing tags
        if (!content.includes('</html>')) {
          content = content.trim();
          if (!content.endsWith('</html>')) {
            content += '\n</html>';
          }
        }
        
        fs.writeFileSync(filePath, content);
        console.log(`✅ Fixed ${file}`);
      }
    });
  }

  // Fix Vercel configuration
  fixVercelConfig() {
    console.log('⚙️ Fixing Vercel configuration...');
    
    const vercelConfig = {
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
    
    fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));
    console.log('✅ Fixed vercel.json configuration');
  }

  // Create missing index.html if needed
  createIndexFile() {
    console.log('📄 Creating index.html if missing...');
    
    const indexPath = path.join(this.projectDir, 'index.html');
    if (!fs.existsSync(indexPath)) {
      const content = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Global Free Streaming Hub</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #000;
            color: #fff;
            margin: 0;
            padding: 20px;
            text-align: center;
        }
        h1 {
            color: #00ffaa;
        }
    </style>
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

  // Backup current files
  backupFiles() {
    console.log('💾 Creating backup of current files...');
    
    const backupDir = path.join(this.projectDir, this.config.backupDir);
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }
    
    // Backup HTML files
    this.config.htmlFiles.forEach(file => {
      const filePath = path.join(this.projectDir, file);
      if (fs.existsSync(filePath)) {
        const backupPath = path.join(backupDir, file);
        fs.copyFileSync(filePath, backupPath);
        console.log(`✅ Backed up ${file}`);
      }
    });
    
    // Backup config files
    this.config.configFiles.forEach(file => {
      const filePath = path.join(this.projectDir, file);
      if (fs.existsSync(filePath)) {
        const backupPath = path.join(backupDir, file);
        fs.copyFileSync(filePath, backupPath);
        console.log(`✅ Backed up ${file}`);
      }
    });
  }

  // Validate HTML structure
  validateHtml() {
    console.log('✅ Validating HTML structure...');
    
    this.config.htmlFiles.forEach(file => {
      const filePath = path.join(this.projectDir, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check for required HTML elements
        const hasDoctype = content.includes('<!DOCTYPE html>');
        const hasHtmlTag = content.includes('<html');
        const hasHeadTag = content.includes('<head');
        const hasBodyTag = content.includes('<body');
        
        if (!hasDoctype || !hasHtmlTag || !hasHeadTag || !hasBodyTag) {
          console.log(`❌ HTML structure issues in ${file}`);
          return false;
        }
        
        console.log(`✅ HTML structure valid for ${file}`);
      }
    });
    
    return true;
  }

  // Run all fixes
  run() {
    console.log('🔧 Running Global Free Streaming Hub Deployment Fix Tool...');
    console.log('===============================================');
    
    try {
      // Create backup
      this.backupFiles();
      
      // Fix configuration
      this.fixVercelConfig();
      
      // Create missing files
      this.createIndexFile();
      
      // Fix HTML files
      this.fixHtmlFiles();
      
      // Validate structure
      this.validateHtml();
      
      console.log('===============================================');
      console.log('✅ Deployment fixes completed successfully!');
      console.log('🔄 Please redeploy your project to see changes');
      
      // Try to redeploy if vercel CLI is available
      try {
        execSync('vercel --version', { stdio: 'ignore' });
        console.log('💡 Vercel CLI detected. You can run "vercel --prod" to redeploy');
      } catch (error) {
        console.log('💡 To redeploy, push changes to GitHub or run "vercel --prod"');
      }
      
    } catch (error) {
      console.error('❌ Error during deployment fix:', error.message);
      process.exit(1);
    }
  }
}

// Run the tool
if (require.main === module) {
  const fixer = new DeploymentFixer();
  fixer.run();
}

module.exports = DeploymentFixer;