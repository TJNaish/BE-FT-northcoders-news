const { Article, Comment } = require('../models');

const getAllArticles = (req, res, next) => {
  Article.find()
    .then(articles => {
      res.status(200).send({ articles })
    })
    .catch(next)
}

const getArticleComments = (req, res, next) => {
  Article.find({ _id: req.params.article_id })
    .then(foundArticle => {
      Comment.find({ belongs_to: foundArticle[0]._id })
        .then(comments => {
          console.log(comments)
          res.status(200).send({ comments })
        })
    })
    .catch(next)
}

module.exports = { getAllArticles, getArticleComments }