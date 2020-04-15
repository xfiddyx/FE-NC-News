import React, { Component } from 'react';
import * as api from '../utils/api';

class DropDown extends Component {
  state = {
    sort: ['created at', 'comment count', 'votes'],
    sort_by: 'created at',
    ordering: ['desc', 'asc'],
    order: 'desc',
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

  componentDidMount() {
    this.fetchArticles();
  }
  componentDidUpdate(prevProps, prevState) {
    const { sort_by, order } = this.state;
    if (
      prevState.sort_by !== this.state.sort_by ||
      prevState.order !== this.state.order
    ) {
      api.getArticles(sort_by, order).then((response) => {
        const { articles } = response.data;
        this.setState({ articles });
      });
    }
  }

  fetchArticles = () => {
    const { sort_by, order } = this.state;
    api.getArticles(sort_by, order).then((response) => {
      const { articles } = response.data;
      this.setState({ articles });
    });
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };
}

export default DropDown;
