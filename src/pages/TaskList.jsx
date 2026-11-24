import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const PAGE_TITLE = `Task List`;

export const TaskList = () => {
  useDocumentTitle();

  return (
    <>
      <h1>{PAGE_TITLE}</h1>
    </>
  );
};
