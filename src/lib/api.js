import { API_URL } from '@/config/env';

const fetchJson = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

export const fetchTasks = async () => fetchJson(`${API_URL}/tasks`);
