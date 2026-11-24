import { useEffect } from 'react';
import { APP_NAME } from '@/config/app';

export const useDocumentTitle = title => {
  useEffect(() => {
    const trimmedTitle = title?.trim();
    document.title = trimmedTitle ? `${trimmedTitle} | ${APP_NAME}` : APP_NAME;
  }, [title]);
};
