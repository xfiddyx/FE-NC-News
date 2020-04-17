import React, { Component } from 'react';
import * as api from '../utils/api';
import { removeDeletedComment } from '../utils/utils';

class Comment extends Component {
  state = { comments: [], usersComment: false, comment: '' };
  render() {
    const { comments } = this.state;
    console.log(this.state);
    return (
      <>
        {this.props.showComments ? (
          <div className='comments-container'>
            <h1>Comments</h1>
            <div>
              <form onSubmit={this.commentSubmit}>
                <label>Comment</label>
                <textarea
                  id='comment'
                  name='subject'
                  placeholder='Leave your comment..'
                  onChange={this.handleCommentChange}
                  required
                ></textarea>
                <input type='submit' value='Submit'></input>
              </form>
            </div>
            <ul className='comments-list'>
              {comments.map(
                ({ votes, created_at, body, author, comment_id }) => {
                  return (
                    <li key={comment_id} className='comments'>
                      <p className='comment-content'>{body}</p>

                      <p className='comment-content'>
                        Submitted by: {author}, on {created_at.substring(0, 10)}
                      </p>
                      <p className='comment-content'>Votes: {votes}</p>
                      {this.props.user === author ? (
                        <button
                          onClick={() => {
                            this.deleteComment(comment_id);
                          }}
                          className='button1'
                        >
                          Delete comment
                        </button>
                      ) : null}
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        ) : null}
      </>
    );
  }
  componentDidMount() {
    this.fetchSingleArticlesComments();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.article_id !== this.props.article_id) {
      this.fetchSingleArticlesComments();
    }
  }

  fetchSingleArticlesComments = () => {
    const { article_id } = this.props;
    api.getComment(article_id).then(({ data }) => {
      this.setState({ comments: data.comments });
    });
  };
  deleteComment = (comment_id) => {
    api.deleteComment(comment_id).then(() => {
      const { comments } = this.state;
      const amendedComments = removeDeletedComment(comments, comment_id);
      this.setState({ comments: amendedComments });
    });
  };

  handleUserChange = (event) => {
    event.preventDefault();
    this.setState({ user: event.target.value });
  };
  handleCommentChange = (event) => {
    event.preventDefault();
    this.setState({ comment: event.target.value });
  };

  commentSubmit = (event) => {
    event.preventDefault();
    const { article_id } = this.props;
    const username = this.props.user;
    const comment = this.state.comment;
    api.addComment(username, comment, article_id).then((data) => {
      this.addCommentToState(data);
    });
    event.target.reset();
  };

  addCommentToState = (data) => {
    this.setState((currentState) => {
      const { comment } = data;
      return { comments: [comment, ...currentState.comments], comment: '' };
    });
  };
}
export default Comment;
