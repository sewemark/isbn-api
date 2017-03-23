"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('users',{
        ID :DataTypes.INTEGER,
        Username :DataTypes.STRING,
        Password: DataTypes.STRING,
        IsActive: DataTypes.BOOLEAN,
        CreateDate :DataTypes.DATEONLY,
    },{
        instanceMethods: {
            retrieveAll: function(onSuccess, onError) {
                User.findAll({raw: true
                    ,include:[{ model:Shelve }]
                }).then(onSuccess).catch(onError);
            }},
        classMethods: {
            associate: function(models) {
                User.hasMany(models.usersettings, {foreignKey:'UserID'});
                User.hasOne(model.shelves, { foreignKey: 'UserID' });
            }
        }
    });
    return User;
};