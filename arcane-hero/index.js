var express = require('express');
var jQuery = require('jquery');
var Q = require('q');
var app = express();

var heroku = require("./heroku");
var hello = require("./hello");

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    console.log("/");

    Q.all([
        heroku.getAppInfo(process.env.HEROKU_API_KEY,
        process.env.HEROKU_APP_NAME),
        heroku.getRelease(process.env.HEROKU_API_KEY,
        process.env.HEROKU_APP_NAME)
    ])
    .spread(function(info, releases) {
        // console.log("info:", JSON.stringify(info));
        // console.log("releases:", JSON.stringify(releases));
        response.render('pages/heroku', { info: info, release: releases } );
    });
});

app.get('/hello', function(request, response) {
    console.log("/hello");
    var world = hello.world();
    console.log("hello:", world);

    response.send(world);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
