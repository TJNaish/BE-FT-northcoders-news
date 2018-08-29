const express = require("express");
const mongoose = require("mongoose");
const apiRouter = require("./routes/apiRouter");
const bodyparser = require("body-parser");

const app = express();

const { DB_URL } =
  process.env.NODE_ENV === "production" ? process.env : require("./config");

mongoose.connect(DB_URL).then(() => {
  console.log(`connected to the ${DB_URL}...`);
});
app.use(bodyparser.json());
app.use("/api", apiRouter);
app.get("/*", (req, res, next) => {
  next({ status: 404, message: "404 Page Not Found" });
});

app.use((err, req, res, next) => {
  if (
    err.status === 404 ||
    err.message === "Cannot read property '_id' of null"
  )
    res.status(404).send({ message: err.message || "404 Not Found" });
  else next(err);
});
app.use((err, req, res, next) => {
  if (err.status === 400 || err.name === "CastError")
    res.status(400).send({ message: err.message || "400 Bad Request" });
  else next(err);
});
app.use((err, req, res, next) => {
  res.status(500).send({ message: "Error 500: Internal Server Error" });
});

module.exports = app;
