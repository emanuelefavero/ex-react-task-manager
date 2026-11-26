import { AddTaskForm } from '@/components/tasks/AddTaskForm';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const PAGE_TITLE = 'Add Task';

export const AddTask = () => {
  useDocumentTitle(PAGE_TITLE);

  return <AddTaskForm heading={PAGE_TITLE} />;
};
