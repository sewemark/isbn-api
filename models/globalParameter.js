"use strict";

module.exports = function(sequelize, DataTypes) {
    var GlobalParameter = sequelize.define('globalparameters',{
        ID :DataTypes.INTEGER,
        Name :DataTypes.STRING,
        BaseAddress :DataTypes.STRING,
    },{
        instanceMethods: {
            retrieveAll: function(onSuccess, onError) {
                GlobalParameter.findAll({raw: true})
                                .then(onSuccess).catch(onError);
            }},
        classMethods: {
            associate: function(models) {
                GlobalParameter.hasMany(models.opinions, {foreignKey:'SourceID'});
            }
        }
    });

    return GlobalParameter;
};