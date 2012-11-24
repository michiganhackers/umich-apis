// Imports like WHAT
var Path			= require("path")
	, csv			= require("csv")
	, fs 			= require("fs")
	, Config		= require(__dirname + "/config")
	, UMich			= Config.umich
	, mongo	   		= require(__dirname + "/databases")
;

// Interface handle
var API = module.exports = exports;

// make call to new API
API.dbLookup = function lookUP(dbName, params, cb) {
	mongo.db.collection(dbName, function (err, collection) {
		if(err) throw err
			console.log(params);
	});
}


