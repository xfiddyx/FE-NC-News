import React, { Component } from 'react';
import * as api from '../utils/api';

class Article extends Component {
  state = { article: {} };
  render() {
    const { article } = this.state;
    return (
      <div>
        <h1>{article.title}</h1>
        <p>{article.body}</p>
      </div>
    );
  }

  componentDidMount() {
    this.fetchSingleArticle();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.article_id !== this.props.article_id) {
      this.fetchSingleArticle();
    }
  }

  fetchSingleArticle = () => {
    const { article_id } = this.props;
    api.getSingleArticle(article_id).then(({ data }) => {
      this.setState({ article: data.article });
    });
  };
}
export default Article;
