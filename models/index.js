var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");


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

sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    }, function (err) {
        console.log('Unable to connect to the database:', err);
    });

var db  = {};
/*
  fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });*/
var model = sequelize.import(path.join(__dirname, 'book.js'));
db[model.name] = model;

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;