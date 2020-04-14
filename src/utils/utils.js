const getAllTopicNames = (topics) => {
  return topics.map((topic) => {
    return topic.slug;
  });
};

export { getAllTopicNames };
