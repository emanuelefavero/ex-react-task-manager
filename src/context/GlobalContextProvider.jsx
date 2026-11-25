import { useTasks } from '@/hooks/useTasks';
import { GlobalContext } from './GlobalContext';

export const GlobalContextProvider = ({ children }) => {
  const tasksState = useTasks();

  return <GlobalContext value={tasksState}>{children}</GlobalContext>;
};
