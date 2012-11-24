// Includes
var Util = require("../../common/utility.js");

// Interface
var API = module.exports = exports;

// Base for all `academics` calls
var getResource = Util.dbLookup.bind({}, "academics");

API.terms = function terms(req, res) {
	var opts = {};

	getResource(opts, function(err, body) {
		if(err) { return res.send(400); }
		res.json(body);
	});
}

API.schools = function schools(req, res) {
	var opts = {termCode: req.params.term_id||1920};

	getResource(opts, function(err, body) {
		if(err) { return res.send(400); }
		res.json(body);
	});
}

API.departments = function departments(req, res) {
	var opts = {
		termCode: req.params.term_id||1920
	, schoolCode: req.params.school_id||"ENG"
	};

	getResource(opts, function(err, body) {
		if(err) { return res.send(400); }
		res.json(body);
	});
}

API.courses = function courses(req, res) {
	var opts = {
		 termCode: req.params.term_id||1920
	, subjectCode: req.params.dept_id||"EECS"
	, includeIndependentStudyFlag: "Y"
	};

	getResource(opts, function(err, body) {
		if(err) { return res.send(400); }
		res.json(body);
	});
}

API.sections = function sections(req, res) {
	var opts = {
		termCode: req.params.term_id||1920
	, subjectCode: req.params.dept_id||"EECS"
	, catalogNumber: req.params.course_id
	};

	getResource(opts, function(err, body) {
		if(err) { return res.send(400); }
		res.json(body);
	});
}

API.times = function times(req, res) {
	var opts = {
		termCode: req.params.term_id||1920
	, subjectCode: req.params.dept_id||"EECS"
	, catalogNumber: req.params.course_id
	, sectionNumber: req.params.section_id||"001"
	};

	while(opts.sectionNumber.length < 3) {
		opts.sectionNumber = "0"+opts.sectionNumber; 
	}

	getResource(opts, function(err, body) {
		if(err) { return res.send(400); }
		res.json(body);
	});
}

API.instructors = function instructors(req, res) {
	var opts = {
		termCode: req.params.term_id||1920
	, subjectCode: req.params.dept_id||"EECS"
	, catalogNumber: req.params.course_id
	, sectionNumber: req.params.section_id||"001"
	};

	while(opts.sectionNumber.length < 3) {
		opts.sectionNumber = "0"+opts.sectionNumber; 
	}

	getResource(opts, function(err, body) {
		if(err) { return res.send(400); }
		res.json(body);
	});
}

API.description = function description(req, res) {
	var opts = {
		termCode: req.params.term_id||1920
	, subjectCode: req.params.dept_id||"EECS"
	, catalogNumber: req.params.course_id
	};

	getResource(opts, function(err, body) {
		if(err) { return res.send(400); }
		res.json(body);
	});
}
