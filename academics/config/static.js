var Express = require("express");

const oneSecond = 1000
    , oneMinute = 60 * oneSecond
    , oneHour = oneMinute * 60
    , oneDay = oneHour * 24
    , oneWeek = oneDay * 7
    , oneMonth = oneWeek * 4  // Close enough...
;

module.exports = function(Server) {
  Server.use(Express.static(__dirname + "/../public"), {maxAge: oneWeek});
}
