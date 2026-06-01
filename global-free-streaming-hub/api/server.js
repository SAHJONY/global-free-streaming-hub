import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// In-memory data store (in a real app, this would be a database)
const contentData = [
  { id: 1, title: "Global Adventure", type: "Movie", year: 2026, region: "Global", description: "Experience a cinematic journey around the world" },
  { id: 2, title: "Tech Revolution", type: "Documentary", year: 2025, region: "USA", description: "Explore the latest technological innovations" },
  { id: 3, title: "Cultural Journey", type: "Series", year: 2026, region: "Europe", description: "Discover diverse cultures from across Europe" },
  { id: 4, title: "Future World", type: "Movie", year: 2027, region: "Asia", description: "A glimpse into tomorrow's possibilities" }
];

const aiAgents = [
  { name: "Content Curator AI", description: "Discovers and organizes global content based on your preferences" },
  { name: "Quality Assurance AI", description: "Ensures all content meets our cinematic quality standards" },
  { name: "Recommendation AI", description: "Personalizes your viewing experience with machine learning" },
  { name: "Translation AI", description: "Provides real-time subtitle generation and translation" }
];

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'Global Free Streaming Hub API',
    timestamp: new Date().toISOString()
  });
});

// Search content endpoint
app.get('/api/search', (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.json({ results: contentData, total: contentData.length });
  }
  
  const filteredContent = contentData.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.type.toLowerCase().includes(query.toLowerCase()) ||
    item.region.toLowerCase().includes(query.toLowerCase())
  );
  
  res.json({ results: filteredContent, total: filteredContent.length });
});

// Get AI agents
app.get('/api/ai-agents', (req, res) => {
  res.json({ agents: aiAgents });
});

// Get recommendations
app.get('/api/recommendations', (req, res) => {
  // In a real implementation, this would use FreeLLMAPI
  res.json({ 
    recommendations: contentData.slice(0, 3),
    algorithm: "FreeLLMAPI Recommendation Engine"
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Global Free Streaming Hub API running on port ${PORT}`);
});