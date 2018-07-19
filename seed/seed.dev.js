const seedDB = require("./seed");
const mongoose = require("mongoose");
const DB_URL = "mongodb://127.0.0.1:27017/ncnews";
const rawData = require("./devData");

mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log(`connected to ${DB_URL}`);
    return seedDB(rawData)
  })
  .then(() => {
    return mongoose.disconnect();
  })