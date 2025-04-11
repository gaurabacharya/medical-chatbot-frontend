import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080"; // fallback if .env not set

export const sendMessage = async (message: string): Promise<string> => {
  const response = await axios.post(`${BASE_URL}/api/chat`, {
    msg: message,
  });

  return response.data.answer;
};