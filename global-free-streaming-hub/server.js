import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { exec } from 'child_process';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'Global Free Streaming Hub API',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Global Free Streaming Hub API running on port ${PORT}`);
});