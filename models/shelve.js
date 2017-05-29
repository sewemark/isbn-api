"use strict";

module.exports = function(sequelize, DataTypes) {
    var Shelve = sequelize.define('shelves',{
        ID : DataTypes.INTEGER
    },{
        instanceMethods :{
            retrieveAll : function (onSuccces, onError) {
                Shelve.findAll({raw:true}).then(onSuccces).catch(onError);
            }
        },
        classMethods: {
            associate: function(models) {
                Shelve.belongsToMany(models.books, {  through: models.shelves_has_books,
                    foreignKey:{
                        name:'Shelves_ID',
                        unique: false
                    },
                    unique: false });
            }
        }
    });

    return Shelve;
};