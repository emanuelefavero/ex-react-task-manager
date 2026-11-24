import { useEffect, useState } from 'react';
import { fetchTasks } from '@/lib/api';
import { GlobalContext } from './GlobalContext';

const INITIAL_TASKS = { step: 'idle' };

export const GlobalContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  useEffect(() => {
    let ignore = false;

    const loadTasks = async () => {
      try {
        setTasks({ step: 'loading' });
        const data = await fetchTasks();

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

    loadTasks();

    return () => {
      ignore = true;
    };
  }, []);

  return <GlobalContext value={{ tasks }}>{children}</GlobalContext>;
};
