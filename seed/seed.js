const mongoose = require("mongoose");
const { Article, Comment, Topic, User } = require("../models");
const { createRef, formatArticleData, formatCommentData } = require("../utils");

const seedDB = ({ topicData, userData, articleData, commentData }) => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      return Promise.all([
        Topic.insertMany(topicData),
        User.insertMany(userData)
      ]);
    })
    .then(([topicDocs, userDocs]) => {
      const userRef = createRef(userData, userDocs, "username");
      const topicRef = createRef(topicData, topicDocs, "slug");
      const formattedArticleData = formatArticleData(
        articleData,
        userRef,
        topicRef
      );
      return Promise.all([
        userDocs,
        topicDocs,
        Article.insertMany(formattedArticleData),
        userRef
      ]);
    })
    .then(([userDocs, topicDocs, articleDocs, userRef]) => {
      const articleRef = createRef(articleData, articleDocs, "title");
      const formattedCommentData = formatCommentData(
        commentData,
        userRef,
        articleRef
      );
      return Promise.all([
        userDocs,
        topicDocs,
        articleDocs,
        Comment.insertMany(formattedCommentData)
      ]);
    });
};

module.exports = seedDB;
