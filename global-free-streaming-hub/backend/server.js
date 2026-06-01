import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Hermes Agent integration
class HermesAgentBridge {
  constructor() {
    this.agentProcess = null;
  }

  // Initialize Hermes Agent
  async initializeAgent() {
    try {
      console.log('Initializing Hermes Agent...');
      // In a real implementation, this would connect to Hermes Agent
      return { status: 'connected', agent: 'Hermes Agent v0.15.1' };
    } catch (error) {
      console.error('Failed to initialize Hermes Agent:', error);
      return { status: 'error', message: error.message };
    }
  }

  // Send command to Hermes Agent
  async sendCommand(command) {
    try {
      // In a real implementation, this would send commands to Hermes Agent
      console.log(`Sending command to Hermes Agent: ${command}`);
      return { 
        status: 'success', 
        command: command,
        result: `Hermes Agent processed: ${command}`
      };
    } catch (error) {
      console.error('Error sending command to Hermes Agent:', error);
      return { status: 'error', message: error.message };
    }
  }
}

// Initialize Hermes Agent bridge
const hermesBridge = new HermesAgentBridge();

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'Global Free Streaming Hub Backend',
    hermes: 'Hermes Agent v0.15.1',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/hermes/status', async (req, res) => {
  const status = await hermesBridge.initializeAgent();
  res.json(status);
});

app.post('/api/hermes/command', async (req, res) => {
  const { command } = req.body;
  if (!command) {
    return res.status(400).json({ error: 'Command is required' });
  }
  
  const result = await hermesBridge.sendCommand(command);
  res.json(result);
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Global Free Streaming Hub Backend running with Hermes Agent on port ${PORT}`);
});