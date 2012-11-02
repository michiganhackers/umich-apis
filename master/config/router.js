const APPLICATION_PATH = __dirname + "/../../";

var Academics = require(APPLICATION_PATH + "academics/server");

module.exports = function Router(Server) {

	Server.use("/academics/v0", Academics.serverHandle());

}
