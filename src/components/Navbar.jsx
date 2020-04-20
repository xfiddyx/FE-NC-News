import React from 'react';
import { Link } from '@reach/router';

const Navbar = () => {
  return (
    <nav className='nav'>
      <ul className='navbar'>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/articles'>Articles</Link>
        </li>
        <li>
          <Link to='/topics'>Topics</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
