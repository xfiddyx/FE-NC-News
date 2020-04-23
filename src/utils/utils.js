const getAllTopicNames = (topics) => {
  return topics.map((topic) => {
    return topic.slug;
  });
};

const removeSelectedItem = (array, idType, itemId) => {
  console.log(idType, itemId);
  return array.filter((arr) => arr[idType] !== itemId);
};

const retrieveUsers = (articles) => {
  const listOfUsers = articles.filter(
    (article, index, art) =>
      art.findIndex((a) => a.author === article.author) === index
  );
  return listOfUsers.map((user) => user.author);
};

export { getAllTopicNames, removeSelectedItem, retrieveUsers };
