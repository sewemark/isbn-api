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
    logging: console.log,
    define: {
        timestamps: false
    }

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

var Book = sequelize.define('books', {
    ID :Sequelize.INTEGER,
    ISBN :Sequelize.STRING,
    Title: Sequelize.STRING,
    Author: Sequelize.STRING,
    Publisher: Sequelize.STRING,
    PublishDate :Sequelize.DATEONLY,
},{
    instanceMethods: {
        retrieveAll: function(onSuccess, onError) {
            Book.findAll({raw: true,include:[
                {model:Opinion}]}).then(onSuccess).catch(onError);
        }}}
);

var Opinion = sequelize.define('opinions',{
    ID :Sequelize.INTEGER,
    Author: Sequelize.STRING,
    IsUsers :Sequelize.BOOLEAN,
    CreateDate :Sequelize.DATEONLY,
    Text: Sequelize.STRING,
    Rate :Sequelize.INTEGER,
},{
    instanceMethods :{
        retrieveAll : function (onSuccces, onError) {
            Opinion.findAll({raw:true}).then(onSuccces).catch(onError);
        }
    }
});
Book.hasMany(Opinion, {foreignKey:'BookID'});

app.get('/listBooks', function (req, res) {
    var book = Book.build();

    book.retrieveAll(function(books) {
        console.log(books);
        if (books) {
            res.json(books);
        } else {
            res.send(401, "Books not found");
        }
    }, function(error) {
        console.log(error);
        res.send("Books not found");
    });
   /* fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log( data );
        res.end( data );
    });*/
});


app.get('/listOpinions', function (req, res) {
    var opinion = Opinion.build();

    opinion.retrieveAll(function(opinions) {
        console.log(opinions);
        if (opinions) {
            res.json(opinions);
        } else {
            res.send(401, "Opinions not found");
        }
    }, function(error) {
        console.log(error);
        res.send("Opinions not found");
    });
    /* fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
     console.log( data );
     res.end( data );
     });*/
});


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


