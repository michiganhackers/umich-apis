// Imports like WHAT
var Request		= require("request")
	, Path			= require("path")
	, Parser		= require("xml2json")
	, Config		= require(__dirname + "/config.js")
	, UMich			= Config.umich
	, mongodb 		= require('mongodb')
;



// Interface handle
var API = module.exports = exports;

// add db and server to the api
API.server = new mongodb.Server("alex.mongohq.com", 10034, {auto_reconnect: true});
API.db = new mongodb.Db('umich-apis', API.server, {safe:false});
API.db.open(function(err, db) {
  API.db.authenticate('umich-api', 'mhackers12', function(err, result) {
    if(err) throw err
    	console.log("Mongo Server Connected"); //best way to do all this?
  });
});

// Get the next OAuth token in the RoundRobin
API.oauthToken = (function oauthTokenWrap() {
	var idx = 0, num = UMich.oauthTokens.length;
	return (function oauthToken() { return UMich.oauthTokens[idx = (idx+1)%num]; });
})();

// Use this to test umichGET
// require("./utility").umichGET("/Academics/v1/", "/SOCSchools/getSchools", {termCode: 1920}, function(err, body) { console.log(err, body); })

// Make a UMich API GET Request
API.umichGET = function getUMAPI(resource, endpoint, params, cb) {
	var url = "";
	if(resource) { url = UMich.apiBase + Path.join(resource, endpoint); } 
	else { url = endpoint; }

	var headers = { "Authorization": "Bearer " + API.oauthToken() }
		, options = {url: url, headers: headers, qs: params||{}}
	;

	Request(options, function(error, response, body) {
		try {
			if(error || response.statusCode !== 200) { return cb(error); }
			var jsonBody = JSON.parse(Parser.toJson(body));
			var topKey = Object.keys(jsonBody);
			var result = jsonBody[topKey[0]]["return"];
			if(result["xsi:nil"] === true) { 
				return cb(null, []); 
			} else if(typeof(result) === "string") { 
				return cb(null, result); 
			} else if (result instanceof Array) {
				var mappedResult = (result||[]).map(function(elem) {
					var elemNew = {};
					for(var key in elem) { elemNew[key.toLowerCase()] = elem[key]["$t"]; }
					return elemNew;
				});
				return cb(null, mappedResult);
			} else {
				var elemNew = {};
				for(var key in result) { elemNew[key.toLowerCase()] = result[key]["$t"]; }
				return cb(null, elemNew);
			}
		} catch(e) {
			console.log(result, e);
			cb(e);
		}
	});
}
