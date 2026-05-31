// API client for Hermes Agent integration
class HermesApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.headers = {
      'Content-Type': 'application/json'
    };
  }

  // Method to initialize Hermes Agent connection
  async initializeHermesAgent() {
    try {
      const response = await fetch(`${this.baseUrl}/api/hermes/status`);
      return await response.json();
    } catch (error) {
      console.error('Error initializing Hermes Agent:', error);
      return { error: error.message };
    }
  }

  // Method to send commands to Hermes Agent
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

  // Method to search for content using Hermes Agent
  async searchContent(query) {
    try {
      const response = await fetch(`${this.baseUrl}/api/content/search?query=${encodeURIComponent(query)}`);
      return await response.json();
    } catch (error) {
      console.error('Error searching content:', error);
      return { error: error.message };
    }
  }

  // Method to get AI recommendations from Hermes Agent
  async getAIRecommendations() {
    try {
      const response = await fetch(`${this.baseUrl}/api/ai/recommend`);
      return await response.json();
    } catch (error) {
      console.error('Error getting AI recommendations:', error);
      return { error: error.message };
    }
  }
}

// Usage example:
// const hermesClient = new HermesApiClient('http://localhost:3001');
// hermesClient.initializeHermesAgent().then(result => {
//   console.log('Hermes Agent Status:', result);
// });

// hermesClient.searchContent('action').then(results => {
//   console.log('Search Results:', results);
// });

// hermesClient.getAIRecommendations().then(recommendations => {
//   console.log('AI Recommendations:', recommendations);
// });