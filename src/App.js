import React, { Component } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Articles from './components/Articles';
import HomePage from './components/HomePage';
import ErrorPage from './components/ErrorPage';
import { Router } from '@reach/router';
import Topics from './components/Topics';

class App extends Component {
  state = {
    user: 'weegembump',
  };
  render() {
    return (
      <div>
        <Header />
        <Navbar />
        <Router>
          <HomePage path='/' />
          <Articles path='/articles/*' user={this.state.user} />
          <Topics path='/topics/*' />
          <ErrorPage default />
        </Router>
      </div>
    );
  }
}

export default App;
