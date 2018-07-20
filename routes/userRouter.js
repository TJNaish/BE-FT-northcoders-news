const userRouter = require(`express`).Router();
const { getUserInfo } = require('../controllers/users')

userRouter.route("/:username")
  .get(getUserInfo)

module.exports = userRouter