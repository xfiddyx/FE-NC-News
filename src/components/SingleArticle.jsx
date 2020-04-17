import React, { Component } from 'react';
import * as api from '../utils/api';
import Comment from './Comment';

class Article extends Component {
  state = {
    article: {},
    showComments: false,
    voteToInc: { votes: 0, id: 0 },
  };
  render() {
    const { article } = this.state;
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
    api.getSingleArticle(article_id).then(({ data }) => {
      this.setState({ article: data.article });
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
