var express = require('express');
var app = express();
var fs = require("fs");
var pg = require('pg');
var mysql = require('mysql');
var routes = require('./routes/index');

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

app.user('/api', routes);
sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    }, function (err) {
        console.log('Unable to connect to the database:', err);
    });



var User = sequelize.define('users',{
    ID :Sequelize.INTEGER,
    Username :Sequelize.STRING,
    Password: Sequelize.STRING,
    IsActive: Sequelize.BOOLEAN,
    CreateDate :Sequelize.DATEONLY,
},{
    instanceMethods: {
        retrieveAll: function(onSuccess, onError) {
            User.findAll({raw: true
                ,include:[{ model:Shelve }]
            }).then(onSuccess).catch(onError);
        }}});

var Role = sequelize.define('roles',{
    ID :Sequelize.INTEGER,
    RoleName :Sequelize.STRING,

},{
    instanceMethods: {
        retrieveAll: function(onSuccess, onError) {
            Role.findAll({raw: true,
                include:[{model:User}]
            }).then(onSuccess).catch(onError);
        }}});
var Shelve = sequelize.define('shelves',{
    ID :Sequelize.INTEGER,

},{
    instanceMethods :{
        retrieveAll : function (onSuccces, onError) {
            Shelve.findAll({raw:true}).then(onSuccces).catch(onError);
        }
    }
});
var ShelveHasBooks = sequelize.define('shelves_has_books',{
    ID :Sequelize.INTEGER,

});
var GlobalParameters = sequelize.define('globalparameters',{
    ID :Sequelize.INTEGER,
    Name :Sequelize.STRING,
    BaseAddress :Sequelize.STRING,
});

var UserSettings = sequelize.define('usersettings',{
    ID :Sequelize.INTEGER,
    SettingKey :Sequelize.STRING,
    SettingNValue :Sequelize.INTEGER,
    SettingDValue :Sequelize.DOUBLE,
    SettingSalue :Sequelize.STRING,
    SettingBValue :Sequelize.BOOLEAN,
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
                {model:Opinion}]
                }).then(onSuccess).catch(onError);
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
Role.hasMany(User, {foreignKey:'RoleID'});
User.hasMany(UserSettings, {foreignKey:'UserID'});
Role.hasMany(User, {foreignKey: 'RoleID'});
User.hasOne(Shelve, { foreignKey: 'UserID' });
Book.belongsToMany(Shelve, {  through: ShelveHasBooks, foreignKey: 'Books_ID' });
Shelve.belongsToMany(Book, {  through: ShelveHasBooks, foreignKey: 'Shelves_ID' });


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

app.get('/listShelves', function (req, res) {
    var shelve = Shelve.build();

    shelve.retrieveAll(function(shelves) {
        console.log(shelves);
        if (shelves) {
            res.json(shelves);
        } else {
            res.send(401, "Shelves not found");
        }
    }, function(error) {
        console.log(error);
        res.send("Shelves not found");
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

app.get('/listUsers', function (req, res) {
    var user = User.build();

    user.retrieveAll(function(users) {
        console.log(users);
        if (users) {
            res.json(users);
        } else {
            res.send(401, "Users not found");
        }
    }, function(error) {
        console.log(error);
        res.send("Users not found");
    });
    /* fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
     console.log( data );
     res.end( data );
     });*/
});

app.get('/listRoles', function (req, res) {
    var role = Role.build();

    role.retrieveAll(function(roles) {
        console.log(roles);
        if (roles) {
            res.json(roles);
        } else {
            res.send(401, "Roles not found");
        }
    }, function(error) {
        console.log(error);
        res.send("Roles not found");
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


app.use(routes);


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


