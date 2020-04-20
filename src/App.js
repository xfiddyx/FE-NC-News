import React, { Component } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Articles from './components/Articles';
import HomePage from './components/HomePage';
import ErrorPage from './components/ErrorPage';
import { Router } from '@reach/router';
import './App.css';
import Topics from './components/Topics';
import Footer from './components/Footer';

class App extends Component {
  state = {
    user: 'weegembump',
  };
  render() {
    const { user } = this.state;
    return (
      <div className='App'>
        <Header user={user} />
        <Navbar />
        <Router>
          <HomePage path='/' />
          <Articles path='/articles/*' user={user} />
          <Topics path='/topics/*' />
          <ErrorPage default />
        </Router>
        <Footer />
        <div className='center-right'>{''}</div>
        <div className='center-left'>{''}</div>
      </div>
    );
  }
}

export default App;
