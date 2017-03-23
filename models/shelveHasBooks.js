"use strict";

module.exports = function(sequelize, DataTypes) {
    var ShelveHasBooks = sequelize.define('shelves_has_books',{
        ID :DataTypes.INTEGER,

    },{
        instanceMethods: {
            retrieveAll: function(onSuccess, onError) {
                ShelveHasBooks.findAll({raw: true
                    //,include:[{model:Opinion}]
                }).then(onSuccess).catch(onError);
            }},
        classMethods: {
            associate: function(models) {
                //Book.hasMany(models.Opinion)
            }
        }
    });
    return ShelveHasBooks;
};