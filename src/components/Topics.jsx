import React, { Component } from 'react';
import { Link, Router } from '@reach/router';
import * as api from '../utils/api';
import Articles from './Articles';

class Topics extends Component {
  state = {
    topics: [],
    isLoading: true,
  };
  render() {
    const { topics, isLoading } = this.state;
    if (isLoading) return <p>...loading</p>;

    return (
      <>
        <h1 className='topics'>Topics</h1>
        <ul className='topics'>
          {topics.map((topic) => {
            return (
              <li key={topic}>
                <Link to={`/topics/${topic}`}>{topic}</Link>
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
    api.getTopics().then((topics) => {
      this.setState({ topics, isLoading: false });
    });
  }
}

export default Topics;
