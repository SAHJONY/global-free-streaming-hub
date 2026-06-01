// Hermes API client for Global Free Streaming Hub
class HermesApiClient {
  constructor() {
    this.baseUrl = 'http://localhost:3001';
  }

  async searchContent(query) {
    try {
      const response = await fetch(`${this.baseUrl}/api/search?query=${encodeURIComponent(query)}`);
      return await response.json();
    } catch (error) {
      console.error('Error searching content:', error);
      return { error: error.message };
    }
  }

  async getAIRecommendations() {
    try {
      const response = await fetch(`${this.baseUrl}/api/recommendations`);
      return await response.json();
    } catch (error) {
      console.error('Error getting recommendations:', error);
      return { error: error.message };
    }
  }

  async getAIAgents() {
    try {
      const response = await fetch(`${this.baseUrl}/api/ai-agents`);
      return await response.json();
    } catch (error) {
      console.error('Error getting AI agents:', error);
      return { error: error.message };
    }
  }

  async sendHermesCommand(command) {
    try {
      const response = await fetch(`${this.baseUrl}/api/hermes/command`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: command })
      });
      return await response.json();
    } catch (error) {
      console.error('Error sending Hermes command:', error);
      return { error: error.message };
    }
  }
}

// Export the client
window.HermesApiClient = HermesApiClient;