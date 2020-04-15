import * as api from '../utils/api';
import React, { Component } from 'react';

class HomePage extends Component {
  state = {
    article: [],
    numberOfArticles: 0,
    articleClock: '',
  };

  render() {
    const { article } = this.state;
    console.log(this.state);
    return (
      <div>
        <h1>Article of the day</h1>
        <ul>
          {article.map(({ title, body, author, created_at, article_id }) => {
            return (
              <li>
                <h3 className='articles'> {title} </h3>
                <p>{body}</p>
                <p className='' id={article_id}>
                  Author: {author}
                </p>
                <p className=''>
                  Created: {new Date(created_at).toString().split('G')[0]}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  componentDidMount() {
    let day = 1000 * 60 * 60 * 24;
    let oneDayAgo = Date.now() - day;
    if (this.props.articleClock < oneDayAgo || this.state.article === []) {
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

          this.setState({
            article: [article],
            numberOfArticles,
            articleClock: new Date(),
          });
          localStorage.setItem('article', JSON.stringify(article));
        });
      });
  };

  hydrateStateWithLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);
        try {
          value = JSON.parse(value);
          this.setState({ [key]: [value] });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }
}

export default HomePage;
