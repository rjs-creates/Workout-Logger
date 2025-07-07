import axios from 'axios';

export const getGeminiApiResponse = async (prompt) => {
  try {
    const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': `${process.env.GEMINI_API_KEY}`
      },
      body: JSON.stringify({
        prompt: prompt,
        maxOutputTokens: 100,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Gemini API response:', error);
    throw error;
  }
}