#!/usr/bin/env python3
"""
UI/UX Design System Generator for Global Free Streaming Hub
"""

import json
import os
import sys
from typing import Dict, List

class StreamingHubDesignSystem:
    def __init__(self):
        self.project_name = "Global Free Streaming Hub"
        self.industry = "streaming"
        self.styles = ["Dark Mode (OLED)", "Glassmorphism", "Minimalism"]
        self.colors = {
            "primary": "#0a0a1a",
            "secondary": "#1a1a2e",
            "cta": "#00cc99",
            "background": "#000000",
            "text": "#ffffff",
            "accent": "#00aaff"
        }
        self.typography = {
            "primary": "Inter",
            "secondary": "Roboto Slab",
            "mood": "Modern, cinematic, sophisticated"
        }
        
    def generate_design_system(self) -> Dict:
        """Generate complete design system for streaming platform"""
        return {
            "project": self.project_name,
            "pattern": "Hero-Centric + Social Proof",
            "conversion": "Emotion-driven with trust elements",
            "sections": [
                "Hero", "Features", "Testimonials", 
                "Content Library", "Pricing", "Contact"
            ],
            "style": self.styles[0],
            "colors": self.colors,
            "typography": self.typography,
            "effects": [
                "Glassmorphism cards",
                "Smooth transitions (200-300ms)",
                "Parallax scrolling",
                "Hover states with glow effects"
            ],
            "anti_patterns": [
                "Bright backgrounds",
                "Harsh animations",
                "Light mode",
                "AI purple/pink gradients"
            ]
        }
        
    def save_design_system(self, filepath: str = "design_system.json"):
        """Save design system to file"""
        design_system = self.generate_design_system()
        with open(filepath, 'w') as f:
            json.dump(design_system, f, indent=2)
        print(f"Design system saved to {filepath}")
        
    def generate_html_template(self) -> str:
        """Generate HTML template with design system"""
        html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{self.project_name}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Slab:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {{
            --primary-dark: {self.colors['primary']};
            --primary-darker: {self.colors['secondary']};
            --accent-green: {self.colors['cta']};
            --accent-blue: {self.colors['accent']};
            --text-light: {self.colors['text']};
            --text-gray: #aaaaaa;
        }}
        
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: 'Inter', sans-serif;
            background-color: var(--primary-dark);
            color: var(--text-light);
            line-height: 1.6;
        }}
        
        .glass-card {{
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 2rem;
            margin: 1rem 0;
            transition: all 0.3s ease;
        }}
        
        .glass-card:hover {{
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 204, 153, 0.2);
        }}
        
        .cta-button {{
            background: var(--accent-green);
            color: var(--primary-dark);
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }}
        
        .cta-button:hover {{
            background: var(--accent-blue);
            transform: scale(1.05);
        }}
    </style>
</head>
<body>
    <header>
        <h1>{self.project_name}</h1>
    </header>
    
    <main>
        <section class="glass-card">
            <h2>Hero Section</h2>
            <p>Experience the world's most advanced streaming platform</p>
            <button class="cta-button">Start Streaming</button>
        </section>
        
        <section class="glass-card">
            <h2>Features</h2>
            <ul>
                <li>8K Cinematic Quality Streaming</li>
                <li>AI-Powered Content Discovery</li>
                <li>Global Content Library</li>
                <li>Advanced Recommendation Engine</li>
            </ul>
        </section>
    </main>
</body>
</html>"""
        return html

def main():
    """Main function to generate design system"""
    designer = StreamingHubDesignSystem()
    
    # Generate and save design system
    designer.save_design_system()
    
    # Generate HTML template
    html_template = designer.generate_html_template()
    with open("streaming_hub_template.html", "w") as f:
        f.write(html_template)
    
    print("UI/UX design system generated successfully!")
    print("Files created:")
    print("- design_system.json")
    print("- streaming_hub_template.html")

if __name__ == "__main__":
    main()