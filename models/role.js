"use strict";

module.exports = function(sequelize, DataTypes) {
    var Role = sequelize.define('roles',{
        ID :DataTypes.INTEGER,
        RoleName :DataTypes.STRING,

    },{
            instanceMethods: {
                retrieveAll: function(onSuccess, onError) {
                    Role.findAll({raw: true,
                        include:[{model:User}]
                    }).then(onSuccess).catch(onError);
                }},
        classMethods: {
            associate: function(models) {
                Role.hasMany(models.users, {foreignKey:'RoleID'})
            }
        }
    });
    return Role;
};