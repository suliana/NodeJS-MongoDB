var express = require('express'),
    app = express(),
    engines = require('consolidate'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));

// Handler for internal server errors
function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).render('error_template', { error: err });
}

MongoClient.connect('mongodb://localhost:27017/smalllist', function(err, db) {

    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");

    app.get('/', function(req, res, next) {
        res.render('adduser', {});
    });
    app.get('/userlist', function(req, res, next){

        db.collection('films').find({}).toArray(function(err, docs) {
            res.render('films', { 'films': docs } );
        });

    });

    app.post('/adduser', function(req, res, next) {
        var title = req.body.title;
        var year = req.body.year;
        var imdb = req.body.imdb;

        if ((title == '') || (year == '') || (imdb == '')) {
            next('Please provide an entry for all fields.');
        }else if ((title == '') && (year != 'number') && (imdb == '')) {
            next()
        }else {
            db.collection('films').insertOne(
                { 'title': title, 'year': year, 'imdb': imdb },
                function (err, doc) {
                    assert.equal(null, err);
                    res.send("Document inserted with _id: " + doc.insertedId);
                }
            );
        }
    });

    app.use(errorHandler);

    var server = app.listen(3000, function() {
        var port = server.address().port;
        console.log('Express server listening on port %s.', port);
    });

});

//     // Set our collection
//     /*var collection = db.get('films');

//     // Submit to the DB
//     collection.insert({
//         "title" : title,
//         "name" : name,
//         "imdb" : imdb
//     }, function (err, doc) {
//         if (err) {
//             // If it failed, return error
//             res.send("There was a problem adding the information to the database.");
//         }
//         else {
//             // And forward to success page
//             res.redirect("userlist");
//         }
//     });
// });

//     app.use(function(req, res){
//         res.sendStatus(404);
//     });

//     var server = app.listen(3000, function() {
//         var port = server.address().port;
//         console.log('Express server listening on port %s.', port);
//     });

// });*/

