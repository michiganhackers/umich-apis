const CONTROLLER_PATH = __dirname + "/../app/controllers";

var Academics = require(CONTROLLER_PATH + "/academics_controller");

module.exports = function Router(Server) {   
	
	Server.get("/terms", Academics.terms);

}
