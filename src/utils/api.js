import axios from 'axios';
import * as util from './utils';

const request = axios.create({
  baseURL: 'https://nc-news-odishon.herokuapp.com/api',
});

export const getArticles = (topic) => {
  console.log(topic);
  if (!topic) {
    return request.get('/articles');
  } else return request.get(`/articles?topic=${topic}`);
};

export const getTopics = () => {
  return request.get('/topics').then((response) => {
    const topics = util.getAllTopicNames(response.data.topics);
    return topics;
  });
};
