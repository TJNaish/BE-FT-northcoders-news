const { Topic, Article } = require('../models');

const getAllTopics = (req, res, next) => {
  Topic.find()
    .then(topics => {
      res.status(200).send({ topics })
    })
    .catch(next)
}

const articlesByTopic = (req, res, next) => {
  Topic.findOne({ slug: req.params.topic })
    .then(topicId => {
      topicId === null
        ? next({ status: 404, message: `Topic "${req.params.topic}" not found` })
        : Article.find({ belongs_to: topicId._id })
          .then(articles => {
            res.status(200).send({ articles })
          })
    })
    .catch(next)
}

module.exports = { getAllTopics, articlesByTopic }