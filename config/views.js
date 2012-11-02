const VIEW_PATH = __dirname + "/../app/views";

module.exports = function(Server) {
  Server.set("view engine", "jade");							// Use Jade by default
  Server.set("views", VIEW_PATH);									// Set the base views path
  Server.set("view options", { layout: false });	// Set the view options
}
