import React, { Component } from 'react';
import SubmittedArticle from './SubmittedArticle';
import * as api from '../utils/api';

class SubmitArticle extends Component {
  state = { body: '', title: '', topic: '', articlePosted: false };
  render() {
    const { topics } = this.props;
    const { articlePosted } = this.state;
    return (
      <>
        <h2>Article</h2>
        <div>
          {!articlePosted ? (
            <form onSubmit={this.articleSubmit}>
              <h3>Article</h3>
              <select name='topic' onChange={this.handleArticle} required>
                {topics.map((choice) => {
                  return (
                    <option value={choice} key={choice}>
                      {choice}
                    </option>
                  );
                })}
              </select>
              <textarea
                id='title'
                name='title'
                className='title__box'
                placeholder='title'
                onChange={this.handleArticle}
                required
              ></textarea>
              <textarea
                id='body'
                name='body'
                placeholder='....'
                onChange={this.handleArticle}
                required
              ></textarea>
              <input type='submit' value='Submit'></input>
            </form>
          ) : articlePosted ? (
            <SubmittedArticle />
          ) : null}
        </div>
      </>
    );
  }
  handleArticle = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  articleSubmit = (event) => {
    event.preventDefault();
    const { body, title, topic } = this.state;
    const { user } = this.props;
    api.postArticle(user, title, topic, body).then((currentState) => {
      this.setState({ articlePosted: !currentState.articlePosted });
    });
    event.target.reset();
  };
}

export default SubmitArticle;
