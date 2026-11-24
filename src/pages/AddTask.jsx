import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const PAGE_TITLE = 'Add Task';

export const AddTask = () => {
  useDocumentTitle(PAGE_TITLE);

  return (
    <>
      <h1>{PAGE_TITLE}</h1>
    </>
  );
};
