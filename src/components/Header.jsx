import React from 'react';

const Header = (props) => {
  const { user } = props;
  return (
    <header>
      <h1>NorthCoders News</h1>
      <p className='header'>You are now logged in as {user} </p>
    </header>
  );
};

export default Header;
