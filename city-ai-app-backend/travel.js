const axios = require('axios');
require('dotenv').config(); // Load API key from .env file

const API_KEY = process.env.API_KEY; // Use API key from environment variables
const API_URL = "https://api-inference.huggingface.co/models/google/gemma-2-2b-it";

/**
 * Function to generate a travel itinerary.
 * @param {string} city - The name of the city to visit.
 * @param {number} days - The number of days of the visit.
 * @returns {Promise<string>} - Generated travel itinerary text
 */
async function generateItinerary(city, days) {
  try {
    // Construct the input prompt
    const prompt = `I will visit ${city} for ${days} days. Create a travel itinerary including famous attractions, cultural activities, and food recommendations.`;

    // Call Hugging Face API
    const response = await axios.post(
      API_URL,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    // Extract and return the generated text
    return response.data[0]?.generated_text || 'No recommendations found.';
  } catch (error) {
    console.error('Error fetching travel recommendations:', error.message);
    if (error.response?.status === 401) {
      console.error('Unauthorized: Check your API key.');
    }
    throw new Error('Failed to generate itinerary. Please try again later.');
  }
}

module.exports = { generateItinerary };