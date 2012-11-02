// Includes
var Util = require("../../common/utility.js");
var API = module.exports = exports;

var getResource = Util.umichGET.bind({}, "/mcPeopleService/v1");

API.people = function people(req, res) {
	var path = "people/{uid}".replace("{uid}", req.params.uniqname)
		, opts = {}
	;

	getResource(path, opts, function(err, body) {
		if(err) { return res.send(400); }
		res.json(body);
	});
}
