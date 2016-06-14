//console.log("Hello, World");
// Source: howtonode.org/hello-node

// Load the http module to create an http server.
/*var http = require('http');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
// console.log("Server running at http://localhost: 8000");
console.log("Server running at http://127.0.0.1:8000/");

*/


var MongoClient = require('mongodb').MongoClient,
     assert      =  require('assert');

MongoClient.connect('mongodb://localhost:27017/video', function(err, db){
	assert.equal(null, err);
	console.log("Successfully connected to server");

	//Fins some documents in our collection
	db.collection('movies').find({}).toArray(function(err, docs){

		//Print the title of each document in the result
		docs.forEach(function(docs){
			console.log(docs.title)
		});

		db.close();

	});

	console.log("Called find()")
});
