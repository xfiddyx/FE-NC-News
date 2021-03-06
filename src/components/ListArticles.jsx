import React from 'react';
import { Link } from '@reach/router';

const ListArticles = (props) => {
  const {
    article_id,
    author,
    title,
    created_at,
    votes,
    comment_count,
  } = props.article;
  return (
    <li key={article_id} className='articles'>
      <Link to={`/articles/${article_id}`} onClick={() => {}}>
        <h3 className='articles'> {title} </h3>
        <p className='details' id={article_id}>
          <strong> Author: </strong> {author}
        </p>
        <p className='details'>
          <strong>Created:</strong>
          {'   '}
          {created_at.substring(0, 10).replace(/-/g, ' ')}
        </p>
        <p className='details'>
          <strong>Votes:</strong>
          {'   '}
          {votes}
        </p>
        <p className='details'>
          <strong>Number of comments:</strong> {comment_count}
        </p>
      </Link>
    </li>
  );
};

export default ListArticles;
