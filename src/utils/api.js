import axios from 'axios';
import * as util from './utils';

const request = axios.create({
  baseURL: 'https://nc-news-odishon.herokuapp.com/api',
});

export const getArticles = (topic, sort_by, order) => {
  if (sort_by) sort_by = sort_by.replace(/ /, '_');
  return request.get('/articles', { params: { topic, sort_by, order } });
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
export const getComment = (id) => {
  return request.get(`/articles/${id}/comments`);
};

export const addComment = (username, body, id) => {
  console.log(username, body, id);
  return request
    .post(`/articles/${id}/comments`, { username, body })
    .then((response) => {
      const { data } = response;
      return data;
    });
};
export const deleteComment = (comment_id) => {
  return request.delete(`/comments/${comment_id}`);
};
