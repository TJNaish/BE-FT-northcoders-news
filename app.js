const express = require('express');
const mongoose = require('mongoose');
const apiRouter = require("./routes/apiRouter");
const path = require('path');

const app = express();

const { DB_URL } = require('./config');

mongoose.connect(DB_URL)
  .then(() => {
    console.log(`connected to the ${DB_URL}...`)
  });

app.use("/api", apiRouter);

module.exports = app;