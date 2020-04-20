import React, { Component } from 'react';
import { Router, Link } from '@reach/router';
import DropDown from './DropDown';
import SingleArticle from './SingleArticle';
import ErrorPage from './ErrorPage';
import * as api from '../utils/api';

class Articles extends Component {
  state = {
    articles: [],
    sort_by: 'created at',
    order: 'desc',
    isLoading: true,
    articlesError: null,
  };

  render() {
    const { articles, isLoading, articlesError } = this.state;
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
          <>
            <div className='columnCenter'>
              <DropDown onChange={this.handleChange} />
              <ul className='articles'>
                {articles.map(
                  ({
                    article_id,
                    author,
                    title,
                    created_at,
                    votes,
                    comment_count,
                  }) => {
                    return (
                      <li key={article_id} className='articles'>
                        <Link to={`/articles/${article_id}`} onClick={() => {}}>
                          <h3 className='articles'> {title} </h3>
                          <p className='details' id={article_id}>
                            Author: {author}
                          </p>{' '}
                          <p className='details'>
                            Created:{' '}
                            {created_at.substring(0, 10).replace(/-/g, ' ')}
                          </p>
                          <p className='details'>Votes: {votes}</p>
                          <p className='details'>
                            Number of comments: {comment_count}
                          </p>
                        </Link>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          </>
        ) : null}
      </>
    );
  }

  componentDidMount() {
    this.fetchArticles();
  }
  componentDidUpdate(prevProps, prevState) {
    const { topic } = this.props;
    const { sort_by, order } = this.state;
    if (
      prevProps.topic !== this.props.topic ||
      prevState.sort_by !== this.state.sort_by ||
      prevState.order !== this.state.order
    ) {
      api.getArticles(topic, sort_by, order).then((response) => {
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
        this.setState({ articles, isLoading: false });
      })
      .catch((err) => {
        console.dir(err);
        const { status, data } = err.response;
        this.setState({
          articlesError: { status: status, message: data.msg },
        });
      });
  };

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };
}

export default Articles;
