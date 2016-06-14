//console.log("Hello, World!");
/*var http = require('http');

var server = http.createServer(function(request, response){
	response.writeHead(200, {"Content-Type":"text/plain"});
	response.end("Hello, World!\n");
});

server.listen(8000);
console.log("Server running at http://localhost:8000");*/


var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var url = 'mongodb://localhost:27017/video';

MongoClient.connect(url, function(err, db) {

    assert.equal(null, err);
    console.log("Successfully connected to server");

    // Find some documents in our collection
    db.collection('movies').find({}).toArray(function(err, docs) {

        // Print the documents returned
        docs.forEach(function(doc) {
            console.log(doc.title);
        });

        // Close the DB
        db.close();
    });

    // Declare success
    console.log("Called find()");
});
