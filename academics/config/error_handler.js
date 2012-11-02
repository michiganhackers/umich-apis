var Express = require("express");

module.exports = function ErrorHandler(Server) {
  Express.errorHandler.title = "We've Traced You Here";
  Server.use(Express.errorHandler());
}
