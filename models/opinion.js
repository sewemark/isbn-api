"use strict";

module.exports = function(sequelize, DataTypes) {
    var Opinion = sequelize.define('opinions',{
        ID :DataTypes.INTEGER,
        Author: DataTypes.STRING,
        IsUsers :DataTypes.BOOLEAN,
        CreateDate :DataTypes.DATEONLY,
        Text: DataTypes.STRING,
        Rate :DataTypes.INTEGER,
    },{
        instanceMethods: {
            retrieveAll: function(onSuccess, onError) {
                Opinion.findAll({raw: true
                    //,include:[{model:Opinion}]
                }).then(onSuccess).catch(onError);
            }},
        classMethods: {
            associate: function(models) {
                //Book.hasMany(models.Opinion)
            }
        }
    });
    return Opinion;
};