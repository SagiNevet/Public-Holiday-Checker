import axios from 'axios';

export default async function handler(req, res) {
  const apiKey = process.env.CALENDARIFIC_API_KEY;  // Access from environment variables

  try {
    const response = await axios.get(`https://calendarific.com/api/v2/countries?api_key=${apiKey}`);
    
    // Return the list of countries
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
}
