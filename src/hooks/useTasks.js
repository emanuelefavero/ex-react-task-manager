import { useEffect, useState } from 'react';
import {
  addTask as apiAddTask,
  deleteTask as apiDeleteTask,
  updateTask as apiUpdateTask,
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

  const updateTask = async updatedTask => {
    checkTasksLoaded(tasks);

    const { id } = updatedTask;
    const response = await apiUpdateTask(id, updatedTask);

    if (!response.success)
      throw new Error(response.message ?? `Error while updating task ${id}`);

    setTasks(prev => ({
      step: 'success',
      data: prev.data.map(task => (task.id === id ? response.task : task)),
    }));
  };

  const removeMultipleTasks = async taskIds => {
    checkTasksLoaded(tasks);

    const results = await Promise.allSettled(
      taskIds.map(id => apiDeleteTask(id)),
    );

    const deletedIds = [];
    const failedIds = [];

    results.forEach((result, index) => {
      const id = taskIds[index];

      if (result.status === 'fulfilled') deletedIds.push(id);
      else failedIds.push(id);
    });

    if (deletedIds.length > 0) {
      setTasks(prev => ({
        step: 'success',
        data: prev.data.filter(task => !deletedIds.includes(task.id)),
      }));
    }

    // If there are failed deletions, throw an error and pass the deletedIds along with it so the caller knows which tasks were successfully deleted
    if (failedIds.length > 0)
      throw Object.assign(
        new Error(`Failed to delete tasks: ${failedIds.join(', ')}`),
        { failedIds },
      );
  };

  return { tasks, addTask, removeTask, updateTask, removeMultipleTasks };
};
