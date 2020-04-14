import React from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Articles from './components/Articles';
import { Router } from '@reach/router';

function App() {
  return (
    <div className='App'>
      <Header />
      <Navbar />
      <Router>
        <Articles path='/articles' />
      </Router>
    </div>
  );
}

export default App;
