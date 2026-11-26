import { useEffect, useState } from 'react';
import {
  addTask as apiAddTask,
  deleteTask as apiDeleteTask,
  fetchTasks,
} from '@/lib/api';

const INITIAL_TASKS = { step: 'idle' };

const checkTasksLoaded = tasks => {
  if (tasks.step !== 'success')
    throw new Error('Load the tasks before performing this action');
};

export const useTasks = () => {
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

  const addTask = async newTask => {
    checkTasksLoaded(tasks);

    const response = await apiAddTask(newTask);

    if (!response.success)
      throw new Error(response.message ?? 'Error while adding task');

    setTasks(prev => ({
      step: 'success',
      data: [...prev.data, response.task],
    }));
  };

  const removeTask = async id => {
    checkTasksLoaded(tasks);

    const response = await apiDeleteTask(id);

    if (!response.success)
      throw new Error(response.message ?? `Error while deleting task ${id}`);

    setTasks(prev => ({
      step: 'success',
      data: prev.data.filter(t => t.id !== id),
    }));
  };

  const updateTask = () => {};

  return { tasks, addTask, removeTask, updateTask };
};
