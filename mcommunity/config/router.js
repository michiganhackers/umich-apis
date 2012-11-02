const CONTROLLER_PATH = __dirname + "/../app/controllers";

var MCommunity = require(CONTROLLER_PATH + "/mcommunity_controller");

module.exports = function Router(Server) {   
	Server.get("/people/:uniqname", MCommunity.people);
}
