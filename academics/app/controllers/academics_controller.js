var Util = require("../../common/utility.js");

var API = module.exports = exports;

const RESOURCE = "/Academics/v1/";
API.terms = function terms(req, res) {
	Util.umichGET(RESOURCE,"SOCSchools/getTerms", {},function(err,body) {
		res.json(body);
	})
}

API.schools = function schools(req, res) {
	res.send("Schools");
}

API.departments = function departments(req, res) {
	res.send("Departments");
}

API.courses = function courses(req, res) {
	res.send("Courses");
}

API.sections = function sections(req, res) {
	res.send("Sections");
}

API.times = function times(req, res) {
	res.send("Times");
}

API.instructors = function instructors(req, res) {
	res.send("Instructors");
}

API.descriptions = function descriptions(req, res) {
	res.send("Descriptions");
}
