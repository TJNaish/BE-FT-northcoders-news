const topicRouter = require(`express`).Router();
const { getAllTopics, articlesByTopic } = require("../controllers/topics");

topicRouter.route("/").get(getAllTopics);

topicRouter.route("/:topic/articles").get(articlesByTopic);

module.exports = topicRouter;
