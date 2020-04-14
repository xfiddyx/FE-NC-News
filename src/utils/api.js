import axios from 'axios';

const request = axios.create({
  baseURL: 'https://nc-news-odishon.herokuapp.com/api',
});

const getArticles = () => {
  return request.get('/articles');
};

export { getArticles };
