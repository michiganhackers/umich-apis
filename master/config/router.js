const APPLICATION_PATH = __dirname + "/../../";

var Master = require(APPLICATION_PATH + "master/app/controllers/master_controller");
var Academics = require(APPLICATION_PATH + "academics/server");

module.exports = function Router(Server) {
	Server.use("/academics/v0", Academics.serverHandle());
	Server.get("/academics/read", Academics.buildDB);
	Server.get("/", Master.docs);
}
