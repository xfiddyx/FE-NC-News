import axios from 'axios';
import * as util from './utils';

const request = axios.create({
  baseURL: 'https://nc-news-odishon.herokuapp.com/api',
});

export const getArticles = (topic) => {
  return request.get('/articles', { params: { topic } });
};

export const getSingleArticle = (id) => {
  return request.get(`/articles/${id}`);
};

export const getTopics = () => {
  return request.get('/topics').then((response) => {
    const topics = util.getAllTopicNames(response.data.topics);
    return topics;
  });
};
