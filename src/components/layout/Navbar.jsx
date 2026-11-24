import { NavLink } from 'react-router';
import { cx } from '@/lib/utils';
import './Navbar.css';

export const Navbar = ({ logo, navLinks = [] }) => {
  return (
    <nav className='navbar'>
      <div className='logo'>{logo}</div>

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
