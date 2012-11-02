var Express       = require("express")
  , Server        = Express()
  , Colors        = require("colors")
  , Settings      = require(__dirname + "/settings.js")	// '.js' enforces file existence
  , Router        = require(__dirname + "/router")
  , Logging       = require(__dirname + "/logging")
  , ErrorHandler  = require(__dirname + "/error_handler")
  , Views         = require(__dirname + "/views")
  , Static        = require(__dirname + "/static")
;

const SERVER_PORT = Settings.port; 

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
module.exports.listen = function listen(subject) {
  Server.listen(subject||SERVER_PORT);
  console.log("Server is listening on port".yellow, subject||SERVER_PORT);
}

// Implement these later
module.exports.stop = function stop() {}
module.exports.restart = function restart() {}
