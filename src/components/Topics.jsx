import React, { Component } from 'react';
import { Link, Router } from '@reach/router';
import * as api from '../utils/api';
import Articles from './Articles';
import ErrorPage from './ErrorPage';

class Topics extends Component {
  state = {
    topics: [],
    isLoading: true,
    topicError: null,
  };
  render() {
    const { topics, isLoading, topicError } = this.state;

    if (topicError)
      return (
        <ErrorPage
          status={this.state.topicError.status}
          message={this.state.topicError.message}
        />
      );
    if (isLoading) return <p>...loading</p>;

    return (
      <>
        <h2 className='topics'>Topics</h2>
        <ul className='topics'>
          {topics.map((topic) => {
            return (
              <li key={topic}>
                <Link to={`/topics/${topic}`}>
                  {topic.charAt(0).toUpperCase() + topic.slice(1)}
                </Link>
              </li>
            );
          })}
        </ul>

        <Router>
          <Articles path=':topic' />
        </Router>
      </>
    );
  }

  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics = () => {
    api
      .getTopics()
      .then((topics) => {
        this.setState({ topics, isLoading: false });
      })
      .catch((err) => {
        const { status, data } = err.response;
        this.setState({
          topicError: { status: status, message: data.msg },
        });
      });
  };
}

export default Topics;
