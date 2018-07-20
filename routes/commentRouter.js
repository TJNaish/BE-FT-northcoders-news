const commentRouter = require(`express`).Router();
const { commentVotes, deleteComment } = require(`../controllers/comments`)

commentRouter.route("/:comment_id")
  .put(commentVotes)
  .delete(deleteComment)

module.exports = commentRouter