import React, { Component } from 'react';
import * as api from '../utils/api';
import { removeSelectedItem } from '../utils/utils';
import ListComments from './ListComments';

class Comment extends Component {
  state = {
    comments: [],
    usersComment: false,
    comment: '',
    voteToInc: { votes: 0, comment_id: 0 },
  };
  render() {
    const { comments } = this.state;
    const {
      handleVote,
      commentId,
      vote,
      type,
      showComments,
      user,
    } = this.props;
    return (
      <>
        {showComments ? (
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
              {comments.map((comment) => {
                return (
                  <ListComments
                    comment={comment}
                    handleVote={handleVote}
                    commentId={commentId}
                    vote={vote}
                    type={type}
                    user={user}
                    deleteComment={this.deleteComment}
                  />
                );
              })}
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
      this.setState((currentState) => {
        const { comments } = currentState;
        const amendedComments = removeSelectedItem(
          comments,
          'comment_id',
          comment_id
        );
        return { comments: amendedComments };
      });
    });
  };

  handleCommentChange = (event) => {
    event.preventDefault();
    const { value } = event.target;

    this.setState({ comment: value });
  };

  commentSubmit = (event) => {
    event.preventDefault();
    const { article_id, user } = this.props;
    const { comment } = this.state;
    api.addComment(user, comment, article_id).then((data) => {
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
