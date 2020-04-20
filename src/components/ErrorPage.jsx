import React from 'react';

const ErrorPage = (props) => {
  const { status, message } = props;
  return (
    <div>
      <h1>Something went wrong....</h1>
      <h2>
        {status}
        {'    '}
        {message}
      </h2>
    </div>
  );
};
export default ErrorPage;
