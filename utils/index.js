const createdByRef = (data, docs) => {
  return data.reduce((acc, currentDatum, index) => {
    acc[currentDatum.created_by] = docs[index]._id;
    return acc;
  }, {})
}

const belongsToRef = (data, docs) => {
  return data.reduce((acc, currentDatum, index) => {
    acc[currentDatum.belongs_to] = docs[index]._id;
    return acc;
  }, {})
}

const exchangeCreatedIDs = (oldItems, ref) => {
  return oldItems.reduce((acc, oldItem) => {
    let oldID = typeof oldItem === 'object' ? oldItem.created_by : oldItem;
    const newID = ref[oldID];
    newID ? acc.push(newID) : null;
    return acc;
  }, []);
}
const exchangeBelongsIDs = (oldItems, ref) => {
  return oldItems.reduce((acc, oldItem) => {
    let oldID = typeof oldItem === 'object' ? oldItem.belongs_to : oldItem;
    const newID = ref[oldID];
    newID ? acc.push(newID) : null;
    return acc;
  }, []);
}

const formatArticleData = (articles, userRef) => {
  return articles.map((article) => {
    return {
      ...article,
      belongs_to: exchangeBelongsIDs(belongs_to, userRef),
      created_by: exchangeCreatedIDs(created_by, userRef)
    }
  })
}
const formatCommentData = (comments, userRef) => {
  return comments.map((comment) => {
    return {
      ...comment,
      belongs_to: exchangeBelongsIDs(belongs_to, userRef),
      created_by: exchangeCreatedIDs(created_by, userRef)
    }
  })
}
formatSingleTopic = topicDatum => {
  return {
    ...topicDatum
  }
}

formatSingleUser = userDatum => {
  return {
    ...userDatum
  }
}

const formatData = (data, formatter) => {
  console.log(data + '<1<<<<<<<<')
  console.log(formatter + '<2<<<<<<<<')
  return data.map(formatter);
}

module.exports = {
  belongsToRef,
  createdByRef,
  formatArticleData,
  formatCommentData,
  formatSingleTopic,
  formatSingleUser,
  formatData
}