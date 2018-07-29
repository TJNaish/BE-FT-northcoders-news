NC News Project

This project is an example of a server for online content management, using MongoDB and an express server model to sort, link and display data.

config - You should set up a config folder in the root of the project. Create an index.js file inside of this, and paste in the following code:

----------------------------------------------------------------------------------
```javascript
const config = {
  dev: {
    DB_URL: 'mongodb://localhost:27017/ncnews'
  },
  test: {
    DB_URL: 'mongodb://localhost:27017/ncnews'
  },
  production: {
    DB_URL: 'mongodb://dreval:eskimo10101@ds245661.mlab.com:45661/tnaish_ncnews'
  }
}

const NODE_ENV = process.env.NODE_ENV || 'production';
module.exports = config[NODE_ENV];
```
----------------------------------------------------------------------------------

Change line 18 'production' to fit whichever DB you want to work from (produciton/dev/test)

root/api will show you a list of endpoints

using terminal from the root of the server, you can seed the database with example data by using the following command:
`npm run seed`

line 4 of the seed file located at seed/seed.dev.js is:
`const rawData = require("./devData")` 
This should be left unchanged for production, however this can be modified to 
`const rawData = require("./testData")`
should you wish to populate the DB with a very small sample of data for testing purposes.