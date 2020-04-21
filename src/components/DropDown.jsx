import React from 'react';

const DropDown = (props) => {
  const sort = ['created at', 'comment count', 'votes', 'user'];
  const ordering = ['desc', 'asc'];
  const { users } = props;
  const handleChange = (event) => {
    const { onChange } = props;
    const { value, name } = event.target;
    onChange(value, name);
  };

  return (
    <div className='dropdown'>
      <select name='order' onChange={handleChange}>
        {ordering.map((choice) => {
          return (
            <option value={choice} key={choice}>
              {choice}
            </option>
          );
        })}
      </select>
      <select name='sort_by' onChange={handleChange}>
        {sort.map((choice) => {
          return (
            <option value={choice} key={choice}>
              {choice}
            </option>
          );
        })}
      </select>
      <select name='author' onChange={handleChange}>
        {users.map((choice) => {
          return (
            <option value={choice} key={choice}>
              {choice}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropDown;
