import React, { Component } from 'react';
import * as api from '../utils/api';

class Comment extends Component {
  state = { comments: [], usersComment: false };
  render() {
    const { comments } = this.state;
    return (
      <>
        {this.props.showComments ? (
          <div className='comments-container'>
            <h1>Comments</h1>
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
      this.fetchSingleArticle();
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
      const { article_id } = this.props;
      api.getComment(article_id).then(({ data }) => {
        this.setState({ comments: data.comments });
      });
    });
  };
}
export default Comment;
