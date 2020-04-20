import React, { Component } from 'react';
import * as api from '../utils/api';
import Comment from './Comment';
import ErrorPage from './ErrorPage';

class Article extends Component {
  state = {
    article: {},
    showComments: false,
    voteToInc: { votes: 0, id: 0 },
    articleIdError: null,
    isLoading: true,
  };
  render() {
    const { article, articleIdError, isLoading } = this.state;
    if (articleIdError)
      return (
        <ErrorPage
          status={this.state.articleIdError.status}
          message={this.state.articleIdError.message}
        />
      );
    if (isLoading) return <p>...loading</p>;

    return (
      <div>
        <h1>{article.title}</h1>
        <p className='singleArticle'>{article.body}</p>
        <p className='singleArticle'>
          Created on:{' '}
          {article.created_at
            ? article.created_at.substr(0, 10).replace(/-/g, ' ')
            : null}
        </p>
        <p>
          Votes:{' '}
          {this.state.voteToInc.id === article.article_id
            ? article.votes + this.state.voteToInc.votes
            : article.votes}
        </p>
        <button
          onClick={() => {
            this.handleVote(1, article.article_id);
          }}
          className='button2'
        ></button>
        <button
          onClick={() => {
            this.handleVote(-1, article.article_id);
          }}
          className='button3'
        ></button>
        <button onClick={this.handleClick} className='button1'>
          Show Comments
        </button>
        <Comment
          path='/comments'
          article_id={this.props.article_id}
          showComments={this.state.showComments}
          user={this.props.user}
          type={'comments'}
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
    api
      .getSingleArticle(article_id)
      .then(({ data }) => {
        this.setState({ article: data.article, isLoading: false });
      })
      .catch((err) => {
        const { status, data } = err.response;
        this.setState({
          articleIdError: { status: status, message: data.msg },
        });
      });
  };

  handleClick = () => {
    this.setState((currentState) => {
      return { showComments: !currentState.showComments };
    });
  };
  handleVote = (vote, id) => {
    this.setState((currentState) => {
      return {
        voteToInc: { votes: currentState.voteToInc.votes + vote, id },
      };
    });
    api.patchVotes(vote, id, this.props.type);
  };
}
export default Article;
