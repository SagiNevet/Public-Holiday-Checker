import axios from 'axios';

export default async function handler(req, res) {
  const { country, year, month, day, location, type } = req.query;
  const apiKey = process.env.CALENDARIFIC_API_KEY; // Make sure this is correctly set

  // Check if required parameters are present
  if (!country || !year) {
    return res.status(400).json({ error: 'Country and year are required parameters' });
  }

  try {
    // Construct the request URL
    let url = `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${country}&year=${year}`;

    // Add optional parameters
    if (month) url += `&month=${month}`;
    if (day) url += `&day=${day}`;
    if (location) url += `&location=${location}`;
    if (type) url += `&type=${type}`;

    const response = await axios.get(url);

    // Return the list of holidays
    res.status(200).json(response.data.response.holidays);
  } catch (error) {
    console.error('Error fetching holidays:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch holidays' });
  }
}
