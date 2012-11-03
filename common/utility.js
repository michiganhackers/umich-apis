// Imports like WHAT
var Request		= require("request")
	, Path			= require("path")
	, Parser		= require("xml2json")
	, Config		= require(__dirname + "/config")
	, UMich			= Config.umich
	, mongo	   		= require(__dirname + "/databases")
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

function addToCache(collection,obj) {
	mongo.db.collection(collection, function (err, collection) {
	if(err) throw err
		collection.insert(obj, function(err, docs){
			if(err) throw err
				//console.log(docs);
		});
	});
}

// Make a UMich API GET Request
API.umichGET = function getUMAPI(resource, endpoint, params, pathKey, cb) {
	var url = "";
	if(resource) { url = UMich.apiBase + Path.join(resource, endpoint); } 
	else { url = endpoint; }

	var headers = { "Authorization": "Bearer " + API.oauthToken() }
		, options = {url: url, headers: headers, qs: params||{}}
	;

	mongo.db.collection("academics_cache", function (err, collection) {
		if(err) throw err
			
		collection.findOne({query:pathKey}, function(err, docs) {

			if(docs != null) cb(null, docs); 
			else {
				
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
							// need to map to different caches here! ***
							addToCache("academics_cache", {query: pathKey, data: mappedResult});
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
		});
	});

	
}
