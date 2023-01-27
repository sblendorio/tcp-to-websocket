const commandLineArgs = require('command-line-args');

function parseOptions(optionDefinitions) {
	try {
	   return commandLineArgs(optionDefinitions);
	} catch(ex) {
	   console.log(ex.message);
	   process.exit(-1);
	}
 }

function getOptions() {
   const options = parseOptions([
      { name: 'port'       , alias: 'p', type: Number },
      { name: 'wsaddress'  , alias: 'w', type: String },
      { name: 'name'       , alias: 'n', type: String },
      { name: 'usestrings' , alias: 'u', type: Boolean, defaultValue: false }
   ]);

   if(options.wsaddress === undefined ||
      options.port === undefined) {
         console.log("Forwards a TCP connection to a WebSocket connection");
         console.log("Usage: tcpws -p port -w wsaddress [-n name] [-usestrings]");
         console.log("   port       the local TCP port number");
         console.log("   wsaddress  the address of the remove WebSocket connection");
         console.log("   name       (optional) the WebSocket sub-protocol name");
         console.log("   usestrings (optional) send data as strings instead of bytes");
         process.exit(0);
   }

   return options;
}

module.exports = getOptions;
