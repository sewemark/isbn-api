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

var modelOpinion = sequelize.import(path.join(__dirname, 'opinion.js'));
db[modelOpinion.name] = modelOpinion;

var modelBook = sequelize.import(path.join(__dirname, 'book.js'));
db[modelBook.name] = modelBook;

var modelShelveHasBook = sequelize.import(path.join(__dirname, 'shelveHasBook.js'));
db[modelShelveHasBook.name] = modelShelveHasBook;


var modelUser = sequelize.import(path.join(__dirname, 'user.js'));
db[modelUser.name] = modelUser;

var modelRole = sequelize.import(path.join(__dirname, 'role.js'));
db[modelRole.name] = modelRole;

var modelGlobalParameter = sequelize.import(path.join(__dirname, 'globalParameter.js'));
db[modelGlobalParameter.name] = modelGlobalParameter;

var modelShelve = sequelize.import(path.join(__dirname, 'shelve.js'));
db[modelShelve.name] = modelShelve;


var modelUserSetting = sequelize.import(path.join(__dirname, 'userSetting.js'));
db[modelUserSetting.name] = modelUserSetting;


Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;