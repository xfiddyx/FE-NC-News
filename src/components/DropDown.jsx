import React, { Component } from 'react';

class DropDown extends Component {
  state = {
    sort: ['created at', 'comment count', 'votes'],
    ordering: ['desc', 'asc'],
  };
  render() {
    const { sort, ordering } = this.state;
    return (
      <>
        <select
          className='select-dropdown'
          name='order'
          onChange={this.handleChange}
        >
          {ordering.map((choice) => {
            return (
              <option value={choice} key={choice}>
                {choice}
              </option>
            );
          })}
        </select>
        <select
          className='select-dropdown'
          name='sort_by'
          onChange={this.handleChange}
        >
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
  }
  handleChange = (event) => {
    const { onChange } = this.props;
    const { value, name } = event.target;
    onChange(value, name);
  };
}

export default DropDown;
