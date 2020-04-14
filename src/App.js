import React from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Articles from './components/Articles';
import { Router } from '@reach/router';
import Topics from './components/Topics';

function App() {
  return (
    <div className='App'>
      <Header />
      <Navbar />
      <Router>
        <Articles path='/articles' />
        <Topics path='/topics/*' />
      </Router>
    </div>
  );
}

export default App;
