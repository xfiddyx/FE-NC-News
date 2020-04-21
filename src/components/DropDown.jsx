import React from 'react';

const DropDown = (props) => {
  const sort = ['created at', 'comment count', 'votes'];
  const ordering = ['desc', 'asc'];

  const handleChange = (event) => {
    const { onChange } = props;
    const { value, name } = event.target;
    onChange(value, name);
  };

  return (
    <>
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
    </>
  );
};

export default DropDown;
