const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { generateItinerary } = require('./travel'); // Import generateItinerary function

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Endpoint to get recommendations
app.post('/generate-itinerary', async (req, res) => {
  const { city, days } = req.body;

  try {
    // Call the generateItinerary method from travel.js
    const itinerary = await generateItinerary(city, days);
    res.json({ itinerary }); // Send the itinerary in the response
  } catch (error) {
    console.error('Error generating itinerary:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
