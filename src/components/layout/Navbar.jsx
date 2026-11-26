import { Link, NavLink } from 'react-router';
import { cx } from '@/lib/utils';
import { PATHS } from '@/router/paths';
import './Navbar.css';
import { BackButton } from '../shared/BackButton';

export const Navbar = ({ logo, navLinks = [] }) => {
  return (
    <nav className='navbar container'>
      <div className='navbar-brand'>
        <Link to={PATHS.HOME} className='logo'>
          {logo}
        </Link>
        <BackButton className='back-button' />
      </div>

      {navLinks.length > 0 && (
        <ul className='nav-links'>
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  cx('nav-link', isActive && 'active')
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};
