import React from 'react';

const Header = (props) => {
  const { user } = props;
  return (
    <header className='header'>
      <h1 className='header__title'>NorthCoders News</h1>
      <p className='login'>You are now logged in as {user} </p>
    </header>
  );
};

export default Header;
