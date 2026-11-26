import { Outlet } from 'react-router';
import './RootLayout.css';
import { Toaster } from '@/components/ui/Sonner';
import { Navbar } from './components/layout/Navbar';
import { APP_AUTHOR, APP_AUTHOR_LINK, APP_NAME } from './config/app';
import { NAV_LINKS } from './router/paths';

const COPYRIGHT_YEAR = new Date().getFullYear();

export const RootLayout = () => {
  return (
    <div className='app-layout'>
      <header>
        <Navbar logo={APP_NAME} navLinks={NAV_LINKS} />
      </header>

      <main className='container'>
        <Outlet />
      </main>

      <footer className='container'>
        &copy; {COPYRIGHT_YEAR} {APP_NAME} - Developed by{' '}
        <a
          className='link'
          href={APP_AUTHOR_LINK}
          target='_blank'
          rel='noopener noreferrer'
        >
          {APP_AUTHOR}
        </a>
      </footer>
      <Toaster />
    </div>
  );
};
