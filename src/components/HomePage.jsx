import * as api from '../utils/api';
import React, { Component } from 'react';
import { Link } from '@reach/router';

class HomePage extends Component {
  state = {
    article: [],
    isLoading: true,
    articleClock: '',
  };

  render() {
    const { article, isLoading } = this.state;
    if (isLoading) return <p>...loading</p>;
    const { title, author, created_at, article_id } = article;
    return (
      <div className='center'>
        <h1>Article of the day</h1>
        <Link to={`/articles/${article_id}`} onClick={() => {}}>
          <li key={article_id} className='article'>
            <h3 className='article'> {title} </h3>
            <p className='' id={article_id}>
              <strong>Author: </strong>Author: {author}
            </p>
            <p>
              <strong>Created: </strong>Created:{' '}
              {created_at.substring(0, 10).replace(/-/g, ' ')}
            </p>
          </li>
        </Link>
      </div>
    );
  }

  componentDidMount() {
    const { article } = this.state;
    let day = 1000 * 60 * 60 * 24;
    let oneDayAgo = Date.now() - day;

    const yesterdaysTime = JSON.parse(localStorage.getItem('articleClock'));
    if (yesterdaysTime < oneDayAgo || article === []) {
      this.fetchArticle();
    } else this.hydrateStateWithLocalStorage();
  }

  fetchArticle = () => {
    api.getRandomArticle().then((response) => {
      const { article } = response.data;
      const todaysDate = new Date();

      this.setState({
        article: article,
        isLoading: false,
        articleClock: todaysDate.setHours(9, 0, 0, 0),
      });
      localStorage.setItem('article', JSON.stringify(article));
      localStorage.setItem('articleClock', JSON.stringify(todaysDate));
    });
  };

  hydrateStateWithLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value, isLoading: false });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }
}
export default HomePage;
