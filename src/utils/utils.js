const getAllTopicNames = (topics) => {
  return topics.map((topic) => {
    return topic.slug;
  });
};

const removeDeletedComment = (comments, comment_id) => {
  return comments.filter((comment) => comment.comment_id !== comment_id);
};

const retrieveUsers = (articles) => {
  const listOfUsers = articles.filter(
    (article, index, art) =>
      art.findIndex((a) => a.author === article.author) === index
  );
  return listOfUsers.map((user) => user.author);
};

export { getAllTopicNames, removeDeletedComment, retrieveUsers };
