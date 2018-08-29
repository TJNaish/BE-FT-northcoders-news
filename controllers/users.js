const { User } = require("../models");

const getUserInfo = (req, res, next) => {
  User.findOne({ username: req.params.username })
    .then(foundUser => {
      foundUser === null
        ? next({
            status: 404,
            message: `Username ${req.params.username} not found`
          })
        : res.status(200).send({ foundUser });
    })
    .catch(next);
};

module.exports = {
  getUserInfo
};
