const CONTROLLER_PATH = __dirname + "/../app/controllers";

var Academics = require(CONTROLLER_PATH + "/academics_controller");

module.exports = function Router(Server) {   
	
	Server.get("/terms", Academics.terms);
	Server.get("/:term_id/schools", Academics.schools);
	Server.get("/:term_id/:school_id/departments", Academics.departments);
	Server.get("/:term_id/:dept_id/courses", Academics.courses);
	Server.get("/:term_id/:dept_id/:course_id/sections", Academics.sections);
	Server.get("/:term_id/:dept_id/:course_id/:section_id/times", Academics.times);
	Server.get("/:term_id/:dept_id/:course_id/:section_id/instructors", Academics.instructors);
	Server.get("/:term_id/:dept_id/:course_id/description", Academics.description);


	// implicit current term ids
	Server.get("/schools", Academics.schools);
	Server.get("/:school_id/departments", Academics.departments);
	Server.get("/:dept_id/courses", Academics.courses);
	Server.get("/:dept_id/:course_id/sections", Academics.sections);
	Server.get("/:dept_id/:course_id/:section_id/times", Academics.times);
	Server.get("/:dept_id/:course_id/:section_id/instructors", Academics.instructors);
	Server.get("/:dept_id/:course_id/description", Academics.description);

}
