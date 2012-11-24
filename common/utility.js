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

API.buildDB = function buildDB(file, database, cb) {
	var days = ["M","T","W","TH","F","S","SU"];
	var all = [];

	mongo.db.collection(database, function (err, collection) {
		if(err) cb(err);

		csv()
		.from(fs.createReadStream(__dirname+'/../academics/classdata/'+file), 
			{ 
				columns: true ,
				trim: true,
				ltrim: true,
				rtrim: true
			})
		.transform(function(data){
			var out = {};
			out.title = data["Course Title"];
			out.number = data["Catalog Nbr"].replace(" ","");
			out.section = data["Section"];

			var lastP = data["Subject"].lastIndexOf("(");
			var end = data["Subject"].length-1;
			out.code = data["Subject"].substring(lastP+1, end);
			out.subject = data["Subject"].substring(0, lastP-1);;

			out.group = data["Acad Group"];
			out.days = "";
			for (i in days) {
				var ch = data[days[i]];
				if(ch) out.days += ch;
			}
			out.time = data["Time"];
			out.location = data["Location"];
			out.instructor = data["Instructor"];
			out.start = data["Start Date"];
			out.end = data["End Date"];
			out.credits = data["Units"];
			out.id = data["Class Nbr"];
			return out;
		})
		.on('record', function(data, index){
			/*collection.insert(data, function(err, docs){
				if(err) {
					return cb(err);
				}
			});*/
		})
		.on('end', function(count){
			cb("Inserted "+count);
		})
		.on('error', function(error){
			console.log(error.message);
		});
	});

}

// make call to new API
API.dbLookup = function lookUP(dbName, params, cb) {
	mongo.db.collection(dbName, function (err, collection) {
		if(err) throw err
		params.dataset = dbName;

		collection.findOne({query:params}, {'_id':0}, function(err, docs) {
			cb(err, docs);
		});
	});
}
