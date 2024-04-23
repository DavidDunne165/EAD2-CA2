// src/api/api.js
const API_URL = 'http://your-backend-url.com'; // Replace with your actual API URL

export const fetchApi = async (endpoint, method, body) => {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });
  return response.json();
};
