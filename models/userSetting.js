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
                }).then(onSuccess).catch(onError);
            }},
        classMethods: {
            associate: function(models) {
            }
        }
    });

    return UserSetting;
};