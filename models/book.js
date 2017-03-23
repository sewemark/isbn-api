"use strict";

module.exports = function(sequelize, DataTypes) {
    var Book = sequelize.define('books', {
            ID :DataTypes.INTEGER,
            ISBN :DataTypes.STRING,
            Title: DataTypes.STRING,
            Author: DataTypes.STRING,
            Publisher: DataTypes.STRING,
            PublishDate :DataTypes.DATEONLY,
        },{
            instanceMethods: {
                retrieveAll: function(onSuccess, onError) {
                    Book.findAll({raw: true,include:[
                        {model:Opinion}]
                    }).then(onSuccess).catch(onError);
                }},
            classMethods: {
                associate: function(models) {
                    Book.hasMany(models.opinions)
                    Book.belongsToMany(models.shelves, {  through: ShelveHasBooks, foreignKey: 'Books_ID' });
                }
            }
    });
    return Book;
};