var Express       = require("express")
  , Server        = Express()
  , Colors        = require("colors")
  , Config		  = require(__dirname + "/../common/config.js")
  , Settings      = require(__dirname + "/settings.js")	// '.js' enforces file existence
  , Router        = require(__dirname + "/router.js")
  , Model 	      = require("../app/models/academics_model.js");
;

const SERVER_PORT = Settings.port; 

// Zero-Config modules
// Server.use(Express.favicon());
// Server.use(Express.query());
// Server.use(Express.bodyParser());
// Server.use(Express.methodOverride());

// Application Config modules
// Logging(Server);						// Logging configuration
// Static(Server);							// Public assets configuration 
Router(Server);							// Routing configuration
Server.use(Server.router);	// Routing registration
// Views(Server);							// View configuration
// ErrorHandler(Server);				// Error handling configuration

// Listen on the default port, or a custom parameter
module.exports.listen = function listen(subject) {
  Server.listen(subject||SERVER_PORT);
  console.log("Server is listening on port".yellow, subject||SERVER_PORT);
}

module.exports.serverHandle = function serverHandle() {
	return Server;
}

module.exports.buildDB = function buildDBHandle(req,res) {
	Model.buildDB('FA2013.csv', "sections_W13", function(data) {
		res.send(data);
	});
}

// Implement these later
module.exports.stop = function stop() {}
module.exports.restart = function restart() {}
