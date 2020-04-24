import React, { Component } from 'react';
import { Router } from '@reach/router';
import DropDown from './DropDown';
import ListArticles from './ListArticles';
import SingleArticle from './SingleArticle';
import ErrorPage from './ErrorPage';
import * as api from '../utils/api';
import { retrieveUsers, removeSelectedItem } from '../utils/utils';

class Articles extends Component {
  state = {
    articles: [],
    users: [],
    sort_by: 'created at',
    order: 'desc',
    author: '',
    isLoading: true,
    articlesError: null,
    articleDeleted: false,
  };

  render() {
    console.log(this.state);
    const { articles, isLoading, articlesError, users } = this.state;
    const { user } = this.props;
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
            user={user}
            type={'articles'}
            articleDeleted={this.state.articleDeleted}
            deleteArticle={this.deleteArticle}
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
      prevState.author !== author
    ) {
      api.getArticles(topic, sort_by, order, author).then((response) => {
        const { articles } = response.data;
        this.setState({ articles });
      });
    }
  }

  fetchArticles = () => {
    const { topic, user } = this.props;
    const { sort_by, order } = this.state;
    api
      .getArticles(topic, sort_by, order)
      .then((response) => {
        const { articles } = response.data;
        const users = retrieveUsers(articles);
        this.setState({ articles, isLoading: false, users, author: user });
      })
      .catch((err) => {
        const { status, data } = err.response;
        this.setState({
          articlesError: { status: status, message: data.msg },
        });
      });
  };

  deleteArticle = (article_id) => {
    api.deleteArticle(article_id).then(() => {
      this.setState((currentState) => {
        const { articles } = currentState;
        const amendedArticles = removeSelectedItem(
          articles,
          'article_id',
          article_id
        );
        return {
          articles: amendedArticles,
          articleDeleted: !currentState.articleDeleted,
        };
      });
    });
  };

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };
}

export default Articles;
