import { Outlet } from 'react-router';
import './RootLayout.css';
import { Navbar } from './components/layout/Navbar';
import { APP_NAME } from './config/app';
import { NAV_LINKS } from './router/paths';

export const RootLayout = () => {
  return (
    <>
      <header className='container'>
        <Navbar logo={APP_NAME} navLinks={NAV_LINKS} />
      </header>

      <main className='container'>
        <Outlet />
      </main>

      <footer className='container'></footer>
    </>
  );
};
