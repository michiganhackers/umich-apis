const CONTROLLER_PATH = __dirname + "/../app/controllers";

var Buildings = require(CONTROLLER_PATH + "/buildings_controller");

module.exports = function Router(Server) {   
	Server.get("/people/:uniqname", Buildings.people);
}
