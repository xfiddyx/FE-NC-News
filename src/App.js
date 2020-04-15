import React from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Articles from './components/Articles';
import HomePage from './components/HomePage';
import { Router } from '@reach/router';
import Topics from './components/Topics';
import { Component } from 'react';

class App extends Component {
  state = {
    date: '',
    timeSet: false,
  };
  render() {
    console.log(this.state.date);
    return (
      <div className='App'>
        <Header />
        <Navbar />
        <Router>
          <HomePage path='/' date={this.state.date} />
          <Articles path='/articles/*' />
          <Topics path='/topics/*' />
        </Router>
      </div>
    );
  }
  componentDidMount() {
    this.setTime();
  }

  setTime = () => {
    let date = Date.now();
    let hour = 1000 * 60 * 60;
    let hourago = Date.now() - hour;
    if (this.state.date > hourago && !this.state.date) {
      this.setState({ date, timeSet: !this.state.timeSet });
    }
  };
}
export default App;
