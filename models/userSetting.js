"use strict";

module.exports = function(sequelize, DataTypes) {
    var UserSetting = sequelize.define('usersettings',{
        ID :DataTypes.INTEGER,
        SettingKey :DataTypes.STRING,
        SettingNValue :DataTypes.INTEGER,
        SettingDValue :DataTypes.DOUBLE,
        SettingSalue :DataTypes.STRING,
        SettingBValue :DataTypes.BOOLEAN,
    },{
        instanceMethods: {
            retrieveAll: function(onSuccess, onError) {
                UserSetting.findAll({raw: true
                    //,include:[{model:Opinion}]
                }).then(onSuccess).catch(onError);
            }},
        classMethods: {
            associate: function(models) {
                //Book.hasMany(models.Opinion)
            }
        }
    });
    return UserSetting;
};