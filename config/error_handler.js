var Express = require("express")
  , Connect = Express.connect
    // Kinda annoying these aren't auto-included
  , Utils   = require("../node_modules/express/node_modules/connect/lib/utils")
;

module.exports = function ErrorHandler(Server) {
  Express.errorHandler.title = "We've Traced You Here";
  Server.use(Express.errorHandler());
}
