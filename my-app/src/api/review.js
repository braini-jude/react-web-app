import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export const reviewCode = async (code) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert code reviewer.' },
          { role: 'user', content: `Review this code:\n\n${code}` },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    return 'Failed to get feedback from AI.';
  }
};
