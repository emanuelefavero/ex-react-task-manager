import { useEffect, useState } from 'react';
import { API_URL } from '@/config/env';
import { fetchJson } from '@/lib/api';
import { GlobalContext } from './GlobalContext';

const INITIAL_TASKS = { step: 'idle' };

export const GlobalContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  useEffect(() => {
    let ignore = false;

    const fetchTasks = async () => {
      try {
        setTasks({ step: 'loading' });
        const data = await fetchJson(`${API_URL}/tasks`);

        if (ignore) return;

        console.log('Tasks: ', data);
        setTasks({ step: 'success', data });
      } catch (error) {
        if (ignore) return;

        setTasks({
          step: 'error',
          error: error?.message ?? 'Error fetching tasks',
        });
      }
    };

    fetchTasks();

    return () => {
      ignore = true;
    };
  }, []);

  return <GlobalContext value={{ tasks }}>{children}</GlobalContext>;
};
