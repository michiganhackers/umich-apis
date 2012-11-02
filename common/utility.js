// Imports like WHAT
var Request	= require("request")
	, Path		= require("path")
	, Config	= require(__dirname + "/config.js")
	, UMich		= Config.umich
;

// Interface handle
var API = module.exports = exports;

// Get the next OAuth token in the RoundRobin
API.oauthToken = (function oauthTokenWrap() {
	var idx = 0, num = UMich.oauthTokens.length;
	return (function oauthToken() { return UMich.oauthTokens[idx = (idx+1)%num]; });
})();

// Use this to test umichGET
// require("./utility").umichGET("/Academics/v1/", "/SOCSchools/getSchools", {termCode: 1920}, function(err, body) { console.log(err, body); })

// Make a UMich API GET Request
API.umichGET = function getUMAPI(resource, endpoint, params, cb) {
	var url = UMich.apiBase + Path.join(resource, endpoint)
		, headers = { "Authorization": "Bearer " + API.oauthToken() }
		, options = {url: url, headers: headers, qs: params||{}}
	;

	Request(options, function(error, response, body) {
		if(error || response.statusCode !== 200) { return cb(error); }
		cb(null, body);
	});
}
