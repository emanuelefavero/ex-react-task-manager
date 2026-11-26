import { generatePath } from 'react-router';

export const PATHS = Object.freeze({
  HOME: '/',
  ADD_TASK: '/add-task',
  TASK_DETAIL: '/task/:id',
});

export const NAV_LINKS = Object.freeze([
  { to: PATHS.HOME, label: 'Home' },
  { to: PATHS.ADD_TASK, label: 'Add Task' },
]);

export const getTaskDetailPath = id => generatePath(PATHS.TASK_DETAIL, { id });
