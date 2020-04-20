import * as api from '../utils/api';
import React, { Component } from 'react';

class HomePage extends Component {
  state = {
    article: [],
    numberOfArticles: 0,
    articleClock: '',
    isLoading: true,
  };

  render() {
    const { article, isLoading } = this.state;
    if (isLoading) return <p>...loading</p>;

    return (
      <div className='center'>
        <h1>Article of the day</h1>
        <ul>
          {article.map(({ title, body, author, created_at, article_id }) => {
            return (
              <li key={article_id}>
                <h3 className='articles'> {title} </h3>
                <p>{body}</p>
                <p className='' id={article_id}>
                  Author: {author}
                </p>
                <p className=''>
                  Created: {created_at.substring(0, 10).replace(/-/g, ' ')}
                </p>
              </li>
            );
          })}
        </ul>
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
    api
      .getArticles()
      .then((response) => {
        const numberOfArticles = response.data.articles.length;
        return numberOfArticles;
      })
      .then((numberOfArticles) => {
        const id = Math.floor(Math.random() * numberOfArticles);
        api.getSingleArticle(id).then((response) => {
          const { article } = response.data;
          const todaysDate = new Date();
          this.setState({
            article: [article],
            numberOfArticles,
            articleClock: todaysDate.setHours(9, 0, 0, 0),
            isLoading: false,
          });
          localStorage.setItem('article', JSON.stringify(article));
          localStorage.setItem('articleClock', JSON.stringify(todaysDate));
        });
      });
  };

  hydrateStateWithLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);
        try {
          value = JSON.parse(value);
          this.setState({ [key]: [value], isLoading: false });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }
}

export default HomePage;
