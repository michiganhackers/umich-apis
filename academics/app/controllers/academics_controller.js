// Includes
var Util = require("../../common/utility.js");
var Model = require("../models/academics_model.js");

// Interface
var API = module.exports = exports;

var getResource = Util.dbLookup;

API.subjects = function subj(req, res) {
	var opts = {};

	getResource("subjects_W13", opts, function(err, body) {
		if(err) { return res.send(400); }
		res.json(body);
	});
}

API.courses = function courses(req, res) {
	var opts = {
		code: req.params.subj_id||"EECS"
	};

	getResource("classes_W13", opts, function(err, body) {
		if(err) { return res.send(400); }
		res.json(body);
	});
}

API.sections = function courses(req, res) {
	var opts = {
		code: req.params.subj_id,
		number: parseInt(req.params.course_id)
	};

	getResource("sections_W13", opts, function(err, body) {
		if(err) { return res.send(400); }
		res.json(body);
	});
}

API.id = function courses(req, res) {
	var opts = {
		id: parseInt(req.params.class_id)
	};

	getResource("sections_W13", opts, function(err, body) {
		if(err) { return res.send(400); }
		res.json(body);
	});
}
