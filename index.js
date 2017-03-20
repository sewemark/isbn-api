var express = require('express');
var app = express();
var fs = require("fs");
var pg = require('pg');
var mysql = require('mysql');
var Sequelize = require('sequelize')
    , sequelize = new Sequelize('heroku_91e003e8105144e', 'b1b91341831a61', '95ec8e44', {
        host :  "us-cdbr-iron-east-03.cleardb.net",
    dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
    port:    3306, // or 5432 (for postgres)
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});


app.get('/listUsers', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log( data );
        res.end( data );
    });
});






sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    }, function (err) {
        console.log('Unable to connect to the database:', err);
    });

var Book = sequelize.define('Book', {
    ID :Sequelize.INTEGER,
    ISBN :Sequelize.STRING,
    Title: Sequelize.STRING,
    Author: Sequelize.STRING,
    Publisher: Sequelize.STRING,
    PublishDate :Sequelize.DATEONLY,
},{
    instanceMethods: {
        retrieveAll: function(onSuccess, onError) {
            Book.findAll({raw: true}).success(onSuccess).error(onError);
        }}}
        );
app.get('/listBooks', function (req, res) {
    var book = Book.build();

    book.retrieveAll(function(books) {
        if (book) {
            res.json(book);
        } else {
            res.send(401, "Books not found");
        }
    }, function(error) {
        res.send("Books not found");
    });
   /* fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log( data );
        res.end( data );
    });*/
});
/*sequelize.sync({force:true}).then(function (err) {
    if(err){
        console.log('An error occur while creating table');
    }else{
        console.log('Book table created successfully');
    }
});*/
/*var con = mysql.createConnection({
    host: "us-cdbr-iron-east-03.cleardb.net",
    user: "b1b91341831a61",
    password: "95ec8e44",
    database: "heroku_91e003e8105144e"
});
con.connect(function(err){
    if(err){
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});
con.end(function(err) {
    // The connection is terminated gracefully
    // Ensures all previously enqueued queries are still
    // before sending a COM_QUIT packet to the MySQL server.
    if(err) console.log('err: ', err);
    else console.log('Terminated done: ');
});
*/
app.get('/db', function (request, response) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query('SELECT * FROM test_table', function(err, result) {
            done();
            if (err)
            { console.error(err); response.send("Error " + err); }
            else
            { response.render('pages/db', {results: result.rows} ); }
        });
    });
});





app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


