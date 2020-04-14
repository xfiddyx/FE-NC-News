import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../utils/api';

class Articles extends Component {
  state = { articles: [] };
  render() {
    const { articles } = this.state;
    console.log(this.state);
    return (
      <ul className='articles'>
        {articles.map(({ article_id, author, title, created_at }) => {
          return (
            <li key={article_id} className='articles'>
              <Link to={`/articles/${article_id}`}>
                <h3 className='articles'> {title} </h3>
                <p className='details' id={article_id}>
                  Author: {author}
                </p>{' '}
                <p className='details'>
                  Created: {new Date(created_at).toString().split('G')[0]}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  componentDidMount() {
    api.getArticles().then((response) => {
      const { articles } = response.data;
      this.setState({ articles });
    });
  }
}

export default Articles;
