import React, { Component } from 'react';
import * as api from '../utils/api';
import Comment from './Comment';

class Article extends Component {
  state = { article: {}, showComments: false };
  render() {
    const { article } = this.state;
    console.log(this.props);
    return (
      <div>
        <h1>{article.title}</h1>
        <p className='singleArticle'>{article.body}</p>
        <p className='singleArticle'>
          Created on:{' '}
          {article.created_at ? article.created_at.substr(0, 10) : null}
        </p>
        <button onClick={this.handleClick} className='button1'>
          Show Comments
        </button>
        <Comment
          path='/'
          article_id={this.props.article_id}
          showComments={this.state.showComments}
          user={this.props.user}
        />
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
  handleClick = () => {
    this.setState((currentState) => {
      return { showComments: !currentState.showComments };
    });
  };
}
export default Article;
