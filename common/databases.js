var MongoDB 	= require("mongodb")
	, Config	= require(__dirname + "/config")
	, MongoCfg  = Config.mongodb
;

var API = module.exports = exports;

(function(MongoDB) {
	var Server		= MongoDB.Server(MongoCfg.host, MongoCfg.port)
		, Database	= MongoDB.Db(MongoCfg.name, Server, {safe: false})
	;

	API.initMongoDB = function initMongoDB(cb) {
		Database.open(function(err, db) {
			if(err) { return cb(err); }
			Database.authenticate(MongoCfg.user, MongoCfg.pass, cb);
		});
	};

})(require("MongoDB"));
