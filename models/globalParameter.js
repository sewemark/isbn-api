"use strict";

module.exports = function(sequelize, DataTypes) {
    var GlobalParameter = sequelize.define('globalparameters',{
        ID :DataTypes.INTEGER,
        Name :DataTypes.STRING,
        BaseAddress :DataTypes.STRING,
    },{
        instanceMethods: {
            retrieveAll: function(onSuccess, onError) {
                GlobalParameter.findAll({raw: true
                    //,include:[{model:Opinion}]
                }).then(onSuccess).catch(onError);
            }},
        classMethods: {
            associate: function(models) {
                //Book.hasMany(models.Opinion)
                GlobalParameter.hasMany(models.globalparameters, {foreignKey:'SourceID'});
            }
        }
    });
    return GlobalParameter;
};