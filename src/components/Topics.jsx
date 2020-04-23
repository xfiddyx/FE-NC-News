import React, { Component } from 'react';
import { Link, Router } from '@reach/router';
import Articles from './Articles';
import ErrorPage from './ErrorPage';

class Topics extends Component {
  state = {
    topics: [],
    isLoading: true,
  };
  render() {
    const { isLoading } = this.state;

    const { topics, topicError } = this.props;
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
  c;
}

export default Topics;
