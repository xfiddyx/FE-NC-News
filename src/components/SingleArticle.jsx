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
    status: '',
    message: '',
  };
  render() {
    const {
      article,
      articleIdError,
      isLoading,
      status,
      message,
      voteToInc,
    } = this.state;
    const { type, deleteArticle, user } = this.props;
    if (articleIdError) return <ErrorPage status={status} message={message} />;
    if (isLoading) return <p>...loading</p>;

    const { body, created_at, votes, article_id } = article;

    return (
      <div className='center'>
        <h1>{article.title}</h1>
        <p className='singleArticle'>{body}</p>
        <p className='singleArticle'>
          Created on:{' '}
          {created_at ? created_at.substr(0, 10).replace(/-/g, ' ') : null}
        </p>
        <p>
          Votes: {voteToInc.id === article_id ? votes + voteToInc.votes : votes}
        </p>
        <button
          onClick={() => {
            this.handleVote(1, article_id, type);
          }}
          className='button2'
          disabled={voteToInc.votes === 1}
        ></button>
        <button
          onClick={() => {
            this.handleVote(-1, article_id, type);
          }}
          disabled={voteToInc.votes === -1}
          className='button3'
        ></button>
        {user === article.author ? (
          <button
            onClick={() => {
              deleteArticle(article_id);
            }}
            className='button1'
          >
            Delete article
          </button>
        ) : null}
        <ul>
          <button onClick={this.handleClick} className='button1'>
            Show Comments
          </button>
        </ul>
        <Comment
          path='/comments'
          article_id={this.props.article_id}
          showComments={this.state.showComments}
          user={this.props.user}
          type={'comments'}
          handleVote={this.handleVote}
          commentId={voteToInc.id}
          vote={voteToInc.votes}
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
  handleVote = (vote, id, type) => {
    this.setState((currentState) => {
      return {
        voteToInc: { votes: currentState.voteToInc.votes + vote, id },
      };
    });
    api.patchVotes(vote, id, type);
  };
}
export default Article;
