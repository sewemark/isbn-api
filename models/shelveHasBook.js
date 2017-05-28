"use strict";

module.exports = function(sequelize, DataTypes) {
    var ShelveHasBooks = sequelize.define('shelves_has_books',{
    },{
        instanceMethods: {
            retrieveAll: function(onSuccess, onError) {
                ShelveHasBooks.findAll({raw: true
                }).then(onSuccess).catch(onError);
            }},
        classMethods: {
            associate: function(models) {
            }
        }
    });
    return ShelveHasBooks;
};