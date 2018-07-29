# NC News Project

## About

This project is an example of a server for online content management, using MongoDB and an express server model to sort, link and display data.

You can find a deployed version of this project at https://tnaish-ncnews.herokuapp.com/api

## Download & Setup

To download this project, take the following steps:

- Fork the project to your own git hub profile.
- Open your terminal, and navigate to where you would like to download the project.
- Clone the repo, by typing "git clone" and then the URL of your repo (you can find this by clicking the green 'Clone or Download' button)
- config - You should set up a config folder in the root of the project. Create an index.js file inside of this, and paste in the following code:

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

- Using terminal from the root of the server, you can seed the database with example data by using the following command:
`npm run seed`
- Run thge server using your terminal by typing `node index/js`
- You can now connect to and view your server locally by opening an internet browser, and going to 127.0.0.1/api

## Dependencies

This project utilises the following dependencies:
- Node 8.10.0
- Body-Parser 1.15.2
- Express 4.16.3
- Mongoose 5.2.4
- Path 0.12.7

You can quickly install of of these dependencies by navigating to the root folder of the project in your terminal and typing `npm i body-parser express mongoose path`

## Modifying

You can change line 18 'production' to fit whichever DB you want to work from (produciton/dev/test)

root/api will show you a list of endpoints

line 4 of the seed file located at seed/seed.dev.js is:
`const rawData = require("./devData")` 
This should be left unchanged for production, however this can be modified to 
`const rawData = require("./testData")`
should you wish to populate the DB with a very small sample of data for testing purposes.