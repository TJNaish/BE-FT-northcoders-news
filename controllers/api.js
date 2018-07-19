const path = require('path');
const getEndpoints = (req, res, next) => {
  let reqPath = path.join(__dirname + '/Endpoints.html');
  console.log(reqPath)
  res.status(200).sendFile(reqPath)
}
module.exports = { getEndpoints }