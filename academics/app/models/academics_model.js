
// Imports like WHAT
var  csv			= require("csv")
	, fs 			= require("fs")
	, mongo	   		= require(__dirname + "/../../../common/databases")
;

var API = module.exports = exports;

API.buildDB = function buildDB(file, database, cb) {
	var days = ["M","T","W","TH","F","S","SU"];
	var all = [];
		mongo.db.collection(database, function (err, collection) {
			if(err) cb(err);
			collection.remove({$atomic: true},  function () {
			csv()
			.from(fs.createReadStream(__dirname+'/../../classdata/'+file), 
				{ columns: true , trim: true, ltrim: true, rtrim: true })
			.transform(function(data){
				var out = {};
				var lastP = data["Subject"].lastIndexOf("(");
				var end = data["Subject"].length-1;

				out.code = data["Subject"].substring(lastP+1, end);
				out.number = parseInt(data["Catalog Nbr"]);
				out.title = data["Course Title"];
				out.subject = data["Subject"].substring(0, lastP-1);
				
				mongo.db.collection("classes_W13").save(out);
				mongo.db.collection("subjects_W13").save({code:out.code,subject:out.subject});

				out.school = data["Acad Group"];
				out.section = parseInt(data["Section"]);
				out.type = data["Component"];
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
				out.id = parseInt(data["Class Nbr"]);
				return out;
			})
			.on('record', function(data, index){
				collection.insert(data, {safe:true}, function(err, docs){
					if(err) {
						return cb(err);
					}
				});
				

				// make new dbs and insure indices
				// make classes collection
				// -> classes only - no times etc

				// search by credits, instructor, location

			})
			.on('end', function(count){
				cb("Inserted "+count);
			})
			.on('error', function(error){
				console.log(error.message);
			});
		});
	});
}

/*function parseInfo() {
	mongo.db.collection("sections_W13", function (err, collection) {
		collection.remove({$atomic: true}, function() {
			mongo.db.collection("classes_W13", function (err, collection) {
			if(err) throw err
				collection.distinct("code", function(err, docs) {
					for(i in docs) {
						thing(collection, docs[i]);
					}
				});
			});
		});
	}); 
}

function thing(collection, code) {
	collection.distinct("number",{"code":code}, function(err, docs) {
		var obj = {};
		collection.findOne({"code":code}, function(err, one) {
			obj.code = code;
			obj.subject = one.subject;
			obj.sections = docs;
			mongo.db.collection("sections_W13", function (err, collection) {
				collection.insert(obj);
			});
		});
	});
}*/

