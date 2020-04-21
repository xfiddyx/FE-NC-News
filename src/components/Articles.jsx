import React, { Component } from 'react';
import { Router } from '@reach/router';
import DropDown from './DropDown';
import ListArticles from './ListArticles';
import SingleArticle from './SingleArticle';
import ErrorPage from './ErrorPage';
import * as api from '../utils/api';
import { retrieveUsers } from '../utils/utils';

class Articles extends Component {
  state = {
    articles: [],
    users: [],
    sort_by: 'created at',
    order: 'desc',
    author: '',
    isLoading: true,
    articlesError: null,
  };

  render() {
    const { articles, isLoading, articlesError, users } = this.state;
    if (articlesError)
      return (
        <ErrorPage
          status={this.state.articlesError.status}
          message={this.state.articlesError.message}
        />
      );

    if (isLoading) return <p>...loading</p>;

    return (
      <>
        <Router>
          <SingleArticle
            path='/:article_id'
            user={this.props.user}
            type={'articles'}
          />
        </Router>
        {!this.props['*'] ? (
          <div className='center'>
            <DropDown onChange={this.handleChange} users={users} />
            <ul className='articles'>
              {articles.map((article, index) => {
                return <ListArticles article={article} key={index} />;
              })}
            </ul>
          </div>
        ) : null}
      </>
    );
  }

  componentDidMount() {
    this.fetchArticles();
  }
  componentDidUpdate(prevProps, prevState) {
    const { topic } = this.props;
    const { sort_by, order, author } = this.state;
    if (
      prevProps.topic !== topic ||
      prevState.sort_by !== sort_by ||
      prevState.order !== order ||
      prevState.user !== author
    ) {
      api.getArticles(topic, sort_by, order, author).then((response) => {
        const { articles } = response.data;
        this.setState({ articles });
      });
    }
  }

  fetchArticles = () => {
    const { topic } = this.props;
    const { sort_by, order } = this.state;
    api
      .getArticles(topic, sort_by, order)
      .then((response) => {
        const { articles } = response.data;
        const users = retrieveUsers(articles);
        this.setState({ articles, isLoading: false, users });
      })
      .catch((err) => {
        const { status, data } = err.response;
        this.setState({
          articlesError: { status: status, message: data.msg },
        });
      });
  };

  handleChange = (value, name) => {
    console.log(value, name);
    this.setState({ [name]: value });
  };
}

export default Articles;
