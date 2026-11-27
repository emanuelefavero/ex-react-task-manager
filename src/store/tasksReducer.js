export const STEPS = Object.freeze({
  IDLE: 'idle',
  LOADING: 'loading',
  ERROR: 'error',
  SUCCESS: 'success',
});

export const INITIAL_TASKS = Object.freeze({ step: STEPS.IDLE });

export const ACTIONS = Object.freeze({
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  LOAD_TASKS: 'LOAD_TASKS',
  ADD_TASK: 'ADD_TASK',
  REMOVE_TASK: 'REMOVE_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  REMOVE_MULTIPLE_TASKS: 'REMOVE_MULTIPLE_TASKS',
});

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOADING:
      return { step: STEPS.LOADING };

    case ACTIONS.ERROR:
      return { step: STEPS.ERROR, error: action.error };

    case ACTIONS.LOAD_TASKS:
      return { step: STEPS.SUCCESS, data: action.tasks };

    case ACTIONS.ADD_TASK:
      return { step: STEPS.SUCCESS, data: [...state.data, action.task] };

    case ACTIONS.REMOVE_TASK:
      return {
        step: STEPS.SUCCESS,
        data: state.data.filter(task => task.id !== action.id),
      };

    case ACTIONS.UPDATE_TASK:
      return {
        step: STEPS.SUCCESS,
        data: state.data.map(task =>
          task.id === action.task.id ? action.task : task,
        ),
      };

    case ACTIONS.REMOVE_MULTIPLE_TASKS:
      return {
        step: STEPS.SUCCESS,
        data: state.data.filter(task => !action.deletedIds.includes(task.id)),
      };

    default:
      return state;
  }
};
