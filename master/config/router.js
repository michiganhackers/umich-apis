const APPLICATION_PATH = __dirname + "/../../";

var Academics = require(APPLICATION_PATH + "academics/server");
var MCommunity = require(APPLICATION_PATH + "mcommunity/server");
var Buildings = require(APPLICATION_PATH + "buildings/server");

module.exports = function Router(Server) {
	Server.use("/academics/v0", Academics.serverHandle());
	Server.use("/mcommunity/v0", MCommunity.serverHandle());
	Server.use("/buildings/v0", Buildings.serverHandle());
}
