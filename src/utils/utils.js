const getAllTopicNames = (topics) => {
  return topics.map((topic) => {
    return topic.slug;
  });
};

const removeDeletedComment = (comments, comment_id) => {
  return comments.filter((comment) => comment.comment_id !== comment_id);
};

export { getAllTopicNames, removeDeletedComment };
