// Includes
var Util = require("../../common/utility.js");
var Model = require("../models/academics_model.js");

// Interface
var API = module.exports = exports;

var getResource = Util.dbLookup;

API.subjects = function subj(req, res) {
	var opts = {};
	var sortby = {
		code:1
	};

	getResource("subjects_W13", opts, sortby, function(err, body) {
		if(err) { return res.send(400); }
		res.json(body);
	});
}

API.courses = function courses(req, res) {
	var opts = {
		code: req.params.subj_id||"EECS"
	};
	var sortby = {
		number:1
	};

	getResource("classes_W13", opts, sortby, function(err, body) {
		if(err) { return res.send(400); }
		res.json(body);
	});
}

API.sections = function courses(req, res) {
	var opts = {
		code: req.params.subj_id,
		number: parseInt(req.params.course_id)
	};
	var sortby = {
		section:1
	};

	getResource("sections_W13", opts, sortby, function(err, body) {
		if(err) { return res.send(400); }
		res.json(body);
	});
}

API.id = function courses(req, res) {
	var opts = {
		id: parseInt(req.params.class_id)
	};
	var sortby = {};
	getResource("sections_W13", opts, sortby, function(err, body) {
		if(err) { return res.send(400); }
		res.json(body);
	});
}
