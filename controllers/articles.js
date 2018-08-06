const { Article, Comment } = require('../models');

const getAllArticles = (req, res, next) => {
  Article.find()
    .then(articles => {
      res.status(200).send({ articles })
    })
    .catch(next)
}

const getArticleComments = (req, res, next) => {
  Article.findOne({ _id: req.params.article_id })
    .then(foundArticle => {
      Comment.find({ belongs_to: foundArticle._id })
        .then(comments => {
          res.status(200).send({ comments })
        })
    })
    .catch(next)
}

const getSingleArticle = (req, res, next) => {
  Article.findOne({ _id: req.params.article_id })
    .then(foundArticle => {
      foundArticle === null
        ? next({ status: 404, message: `Article with ID ${req.params.article_id} not found` })
        : res.status(200).send({ foundArticle })
    })
    .catch(next)
}

const articleVotes = (req, res, next) => {
  let num = -1
  if (req.query.vote === 'up') num = 1
  Article.findByIdAndUpdate(req.params.article_id, { $inc: { votes: num } }, { new: true })
    .then(updatedVote => {
      updatedVote === null ?
        next({ status: 404, message: `Article with ID ${req.params.article_id} not found` })
        : res.status(200).send({ updatedVote })
    })
    .catch(next)
}

const postNewComment = (req, res, next) => {
  const articleId = req.params.article_id
  const newComment = new Comment({ body: req.body.body, belongs_to: articleId, created_by: req.body.created_by })
  newComment.save()
    .then(comment => {
      res.status(201).send({ comment, message: 'Your comment has been added.' })
    })
    .catch(next)
}

module.exports = { getAllArticles, getArticleComments, getSingleArticle, articleVotes, postNewComment }