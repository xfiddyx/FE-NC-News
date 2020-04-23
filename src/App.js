import React, { Component } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Articles from './components/Articles';
import HomePage from './components/HomePage';
import ErrorPage from './components/ErrorPage';
import * as api from './utils/api';

import SubmitArticle from './components/SubmitArticle';
import './App.css';
import { Router } from '@reach/router';
import Topics from './components/Topics';

class App extends Component {
  state = {
    user: 'weegembump',
    topics: [],
    topicError: null,
  };

  render() {
    console.log(this.state);
    const { user, topics, topicError } = this.state;
    return (
      <div className='App'>
        <Header user={user} />
        <Navbar />
        <Router>
          <HomePage path='/' />
          <Articles path='/articles/*' user={user} />
          <Topics path='/topics/*' topics={topics} topicError={topicError} />
          <SubmitArticle
            path='/submit_article'
            user={user}
            topics={this.state.topics}
          />
          <ErrorPage default />
        </Router>
        <div className='center-right'>{''}</div>
        <div className='center-left'>{''}</div>
      </div>
    );
  }
  componentDidMount() {
    this.fetchTopics();
  }
  fetchTopics = () => {
    api
      .getTopics()
      .then((topics) => {
        this.setState({ topics });
      })
      .catch((err) => {
        const { status, data } = err.response;
        this.setState({
          topicError: { status: status, message: data.msg },
        });
      });
  };
}

export default App;
