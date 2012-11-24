const CONTROLLER_PATH = __dirname + "/../app/controllers";

var Academics = require(CONTROLLER_PATH + "/academics_controller");

module.exports = function Router(Server) {   
	
	Server.get("/subjects", Academics.subjects); // returns array of subjects
	Server.get("/:subj_id/courses", Academics.courses);
	Server.get("/:subj_id/:course_id/sections", Academics.sections);
	Server.get("/:class_id/info", Academics.id);

}
