const { Topic, Article } = require('../models');

const getAllTopics = (req, res, next) => {
  Topic.find()
    .then(topics => {
      res.status(200).send({ topics })
    })
    .catch(next)
}

const articlesByTopic = (req, res, next) => {
  Topic.find({ slug: req.params.topic })
    .then(topicId => {
      Article.find({ belongs_to: topicId[0]._id })
        .then(articles => {
          res.status(200).send({ articles })
        })
    })
    .catch(next)
}

module.exports = { getAllTopics, articlesByTopic }