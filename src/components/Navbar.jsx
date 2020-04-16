import React, { Component } from 'react';
import { Link } from '@reach/router';

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav>
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
      </div>
    );
  }
}

export default Navbar;
