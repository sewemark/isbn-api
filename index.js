var express = require('express');
var app = module.exports = express();
var fs = require("fs");
var pg = require('pg');
var mysql = require('mysql');
var routes = require('./routes/index');
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));
app.set('superSecret', "SuperSecrectRamPamPam!@@#$%");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(request, response) { response.send('Books api'); });
app.use('/api', routes);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});





