import { API_URL } from '@/config/env';
import { tasksSchema, validate } from '@/lib/validation';

const DELAY_MS = 300;
const fakeDelay = ms => new Promise(resolve => setTimeout(resolve, ms));

const fetchJson = async (url, options) => {
  const [response] = await Promise.all([
    fetch(url, options),
    fakeDelay(DELAY_MS),
  ]);

  // Check if the response is not OK and throw an error with the message from the response body if available
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? `HTTP error: ${response.status}`);
  }

  return response.json();
};

export const fetchTasks = async () => {
  const data = await fetchJson(`${API_URL}/tasks`);
  const result = validate(tasksSchema, data);

  if (!result.success)
    throw new Error(`Invalid response from GET /tasks: ${result.error}`);

  return result.data;
};

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

export const updateTask = (id, { title, description, status }) =>
  fetchJson(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description, status }),
  });
