
var API = module.exports = exports;

API.terms = function terms(req, res) {
	
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
