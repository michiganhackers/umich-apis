var Express       = require("express")
  , Server        = Express()
  , Colors        = require("colors")
  , Config	      = require(__dirname + "/../common/config.js")	
  , Router        = require(__dirname + "/router")
  , Logging       = require(__dirname + "/logging")
  , ErrorHandler  = require(__dirname + "/error_handler")
  , Views         = require(__dirname + "/views")
  , Static        = require(__dirname + "/static")
;

// Zero-Config modules
Server.use(Express.favicon());
Server.use(Express.query());
Server.use(Express.bodyParser());
Server.use(Express.methodOverride());

// Application Config modules
Logging(Server);						// Logging configuration
Static(Server);							// Public assets configuration 
Router(Server);							// Routing configuration
Server.use(Server.router);	// Routing registration
Views(Server);							// View configuration
ErrorHandler(Server);				// Error handling configuration

// Listen on the default port, or a custom parameter
module.exports.listen = function listen() {
  Server.listen(Config.port);
  console.log("Server is listening on port".yellow, Config.port);
}

// Implement these later
module.exports.stop = function stop() {}
module.exports.restart = function restart() {}
