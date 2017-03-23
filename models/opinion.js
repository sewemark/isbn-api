"use strict";

module.exports = function(sequelize, DataTypes) {
    var Opinion = sequelize.define('opinions',{
        ID :Sequelize.INTEGER,
        Author: Sequelize.STRING,
        IsUsers :Sequelize.BOOLEAN,
        CreateDate :Sequelize.DATEONLY,
        Text: Sequelize.STRING,
        Rate :Sequelize.INTEGER,
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