var Express   = require("express")
	, Winston		= require("winston")
	, FileSys		= require("fs")
;

const TIMESTAMP = new(Date)().getTime().toString();
const LOG_FILE = __dirname + "/../logs/"+TIMESTAMP.toString()+"-stdout.log";

var WinstonLogger = {write: function(msg, enc) { Winston.info(msg); }};
var WriteStream	= FileSys.createWriteStream(LOG_FILE);
Winston.add(Winston.transports.File, {stream: WriteStream})

module.exports = function Logging(Server) {
  Server.use(Express.responseTime());
  Server.use(Express.logger({stream:WinstonLogger}));
}
