var util = require('util'),
  exec = require('child_process').exec,
  MySQL = require('mysql').Client;

var Joomla = module.exports = function Joomla (options) {
  this.options = options = options || {};
};

Joomla.connect = function (callback) {
  var client = new MySQL();

  client.user = Joomla.config.user;
  client.password = Joomla.config.password;

  client.query('USE ' + Joomla.config.db, function(error, results) {
    if(error) {
      console.log('MySQL Connection Error: ' + error.message);
      client.end();
      return;
    }

    Joomla.mysql_client = client;
    callback();
  });
};

Joomla.configure = function (config, callback) {
	if (typeof config === "string") {
		exec('php node_modules/node-joomla/config_loader.php ' + config,
	    function (error, stdout, stderr) {
	      if(error) {
	        console.log('PHP Error: ' + error.message);
	        return;
	      }

	      Joomla.config = JSON.parse(stdout);
	      Joomla.connect(callback);
	  });
	} else {
		Joomla.config = config;
		Joomla.connect(callback);
	}
};

// GetData = function(client) {
//   client.query(
//     'SELECT * FROM ' + config.dbprefix + 'users',
//     function selectCb(error, results, fields) {
//       if (error) {
//           console.log('GetData Error: ' + error.message);
//           client.end();
//           return;
//       }
//       // Uncomment these if you want lots of feedback
//       //console.log('Results:');
//       //console.log(results);
//       //console.log('Field metadata:');
//       //console.log(fields);
//       //console.log(sys.inspect(results));
// 
//       if(results.length > 0)
//       {
//    for (var i=0; i < results.length; i++) {
//      var result = results[i];
// 
//          console.log('First Name: ' + result.username);
//          console.log('Last Name: ' + result.email);
//          console.log('Message: ' + result.id);
//    }
//       }
//  });
// 
// };