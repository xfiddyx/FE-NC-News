import React from 'react';

const ErrorPage = (props) => {
  return (
    <div>
      <h1>Something went wrong....</h1>
      <h2>
        {props.status}
        {'    '}
        {props.message}
      </h2>
    </div>
  );
};
export default ErrorPage;
