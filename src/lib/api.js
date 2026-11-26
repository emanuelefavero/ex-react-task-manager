import { API_URL } from '@/config/env';

const fetchJson = async (url, options) => {
  const response = await fetch(url, options);

  // Check if the response is not OK and throw an error with the message from the response body if available
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? `HTTP error: ${response.status}`);
  }

  return response.json();
};

export const fetchTasks = async () => fetchJson(`${API_URL}/tasks`);

export const addTask = async task =>
  fetchJson(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

export const deleteTask = async id =>
  fetchJson(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
