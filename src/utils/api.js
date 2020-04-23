import axios from 'axios';
import * as util from './utils';

const request = axios.create({
  baseURL: 'https://nc-news-odishon.herokuapp.com/api',
});

export const getArticles = (topic, sort_by, order, author) => {
  if (sort_by) sort_by = sort_by.replace(/ /, '_');
  return request.get('/articles', {
    params: { topic, sort_by, order, author },
  });
};

export const getSingleArticle = (id) => {
  return request.get(`/articles/${id}`);
};

export const getRandomArticle = () => {
  return request.get('/articles/article');
};

export const postArticle = (username, title, topic, body) => {
  console.log(username, title, topic, body);
  return request
    .post('/articles/article', { username, title, topic, body })
    .then((response) => {
      const { data } = response;
      return data;
    });
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
  return request
    .post(`/articles/${id}/comments`, { username, body })
    .then((response) => {
      const { data } = response;
      return data;
    });
};

export const patchVotes = (vote, id, type) => {
  const { data } = request.patch(`/${type}/${id}`, {
    inc_votes: vote,
  });
  return data;
};

export const deleteComment = (comment_id) => {
  return request.delete(`/comments/${comment_id}`);
};
