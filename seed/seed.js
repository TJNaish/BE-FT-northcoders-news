const mongoose = require("mongoose");
const { Article, Comment, Topic, User } = require('../models');
const {
  createRef,
  formatArticleData,
  formatCommentData,
  formatSingleTopic,
  formatSingleUser,
  formatData
} = require("../utils");

const seedDB = ({ topicData, userData, articleData, commentData }) => {
  return mongoose.connection.dropDatabase().then(() => {
    const formattedTopicData = formatData(topicData, formatSingleTopic);
    const formattedUserData = formatData(userData, formatSingleUser);
    return Promise.all([
      Topic.insertMany(formattedTopicData),
      User.insertMany(formattedUserData)
    ]);
  })
    .then(([topicDocs, userDocs]) => {
      const userRef = createRef(userData, userDocs, 'username');
      const topicRef = createRef(topicData, topicDocs, 'slug');
      const formattedArticleData = formatArticleData(articleData, userRef, topicRef);
      return Promise.all([
        userDocs,
        topicDocs,
        Article.insertMany(formattedArticleData),
        userRef
      ]);
    })
    .then(([userDocs, topicDocs, articleDocs, userRef]) => {
      const articleRef = createRef(articleData, articleDocs, 'title');
      const formattedCommentData = formatCommentData(commentData, userRef, articleRef);
      return Promise.all([
        userDocs,
        topicDocs,
        articleDocs,
        Comment.insertMany(formattedCommentData)
      ])
    })
};

module.exports = seedDB;