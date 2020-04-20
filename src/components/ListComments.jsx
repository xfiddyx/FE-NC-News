import React from 'react';

const ListComments = (props) => {
  const { votes, created_at, body, author, comment_id } = props.comment;
  const { handleVote, vote, commentId, type, deleteComment, user } = props;

  return (
    <li key={comment_id} className='comments'>
      <p className='comment-content'>{body}</p>

      <p className='comment-content'>
        Submitted by: {author}, on{' '}
        {created_at.substring(0, 10).replace(/-/g, ' ')}
      </p>
      <p className='comment-content'>
        Votes: {commentId === comment_id ? votes + vote : votes}
      </p>
      {user === author ? (
        <button
          onClick={() => {
            deleteComment(comment_id);
          }}
          className='button1'
        >
          Delete comment
        </button>
      ) : null}
      <button
        onClick={() => {
          handleVote(1, comment_id, type);
        }}
        disabled={vote === 1}
        className='button2'
      ></button>
      <button
        onClick={() => {
          handleVote(-1, comment_id, type);
        }}
        className='button3'
        disabled={vote === -1}
      ></button>
    </li>
  );
};

export default ListComments;
