const { Comment } = require('../models');

const commentVotes = (req, res, next) => {
  let num = -1
  if (req.query.vote === 'up') num = 1
  Comment.findByIdAndUpdate(req.params.comment_id, { $inc: { votes: num } }, { new: true })
    .then(updatedVote => {
      updatedVote === null
        ? next({ status: 404, message: `Comment with ID ${req.params.comment_id} not found` })
        : res.status(200).send({ updatedVote })
    })
    .catch(next)
}

const deleteComment = (req, res, next) => {
  Comment.findOne({ _id: req.params.comment_id }).remove().exec()
    .then(
      res.status(200).send({ message: 'Comment Deleted' })
    )
    .catch(next)
}

module.exports = { commentVotes, deleteComment }