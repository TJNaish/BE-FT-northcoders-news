const mongoose = require("mongoose");
const { Article, Comment, Topic, User } = require('../models');
const {
  belongsToRef,
  createdByRef,
  formatArticleData,
  formatCommentData,
  formatSingleTopic,
  formatSingleUser,
  formatData
} = require("../utils");

const seedDB = ({ topicData, userData }) => {
  return mongoose.connection.dropDatabase().then(() => {
    const formattedTopicData = formatData(topicData, formatSingleTopic);
    const formattedUserData = formatData(userData, formatSingleUser);
    return Promise.all([
      Topic.insertMany(formattedTopicData),
      User.insertMany(formattedUserData)
    ]);
  });
};

module.exports = seedDB;
