const express = require("express")
const apiRouter = express.Router();
const path = require('path');
const articleRouter = require("./articleRouter");
const commentRouter = require("./commentRouter");
const topicRouter = require("./topicRouter");
const userRouter = require("./userRouter");
const { getEndpoints } = require("../controllers/api")

apiRouter.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', "/public/Endpoints.html"))
})

apiRouter.use("/articles", articleRouter);
apiRouter.use("/comments", commentRouter);
apiRouter.use("/topics", topicRouter);
apiRouter.use("/users", userRouter);

module.exports = apiRouter;