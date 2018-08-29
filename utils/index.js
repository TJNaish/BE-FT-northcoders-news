const createRef = (data, docs, field) => {
  return data.reduce((acc, currentDatum, index) => {
    acc[currentDatum[field]] = docs[index]._id;
    return acc;
  }, {});
};

const exchangeCreatedIDs = (oldItems, ref) => {
  if (typeof oldItems === "string") return ref[oldItems];
  else
    return oldItems.reduce((acc, oldItem) => {
      let oldID = typeof oldItem === "object" ? oldItem.created_by : oldItem;
      const newID = ref[oldID];
      newID ? acc.push(newID) : null;
      return acc;
    }, []);
};
const exchangeBelongsIDs = (oldItems, ref) => {
  if (typeof oldItems === "string") return ref[oldItems];
  return oldItems.reduce((acc, oldItem) => {
    let oldID = typeof oldItem === "object" ? oldItem.belongs_to : oldItem;
    const newID = ref[oldID];
    newID ? acc.push(newID) : null;
    return acc;
  }, []);
};

const formatArticleData = (articles, userRef, topicRef) => {
  return articles.map(article => {
    return {
      ...article,
      belongs_to: exchangeBelongsIDs(article.topic, topicRef),
      created_by: exchangeCreatedIDs(article.created_by, userRef)
    };
  });
};
const formatCommentData = (comments, userRef, articleRef) => {
  return comments.map(comment => {
    return {
      ...comment,
      belongs_to: exchangeBelongsIDs(comment.belongs_to, articleRef),
      created_by: exchangeCreatedIDs(comment.created_by, userRef)
    };
  });
};

module.exports = {
  createRef,
  formatArticleData,
  formatCommentData
};
