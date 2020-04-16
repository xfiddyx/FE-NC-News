import React, { Component } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Articles from './components/Articles';
import HomePage from './components/HomePage';
import { Router } from '@reach/router';
import Topics from './components/Topics';

class App extends Component {
  state = {
    user: 'weegembump',
  };
  render() {
    return (
      <div className='App'>
        <Header />
        <Navbar />
        <Router>
          <HomePage path='/' />
          <Articles path='/articles/*' user={this.state.user} />
          <Topics path='/topics/*' />
        </Router>
      </div>
    );
  }
}

export default App;
