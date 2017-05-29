var models = require('../../models');
var jwt = require('jsonwebtoken');

module.exports = {

    getAll: function(req, res) {
        models.books.findAll({
        }).then(function(books) {
            res.status(200).send({
                books: books
            });
        }).catch(function (err) {
            res.status(500).send({
                success: false,
                message: 'Cannot get books'
            })
        });
    },

    add: function(req, res) {
        models.books.create({
            ISBN: req.body.isbn,
            Title: req.body.title,
            Author: req.body.author,
            PublishDate: req.body.publishdate,
        }).then(function(user) {
            res.status(200).send("Book has been created");
        }).catch(function (err) {
            res.status(500).send({
                success: false,
                message: 'Cannot add book'
            })
        });
    },

    delete: function(req, res) {
        models.books.destroy({
            where: {
                id: req.params.book_id
            }
        }).then(function() {
            res.status(200).send("Book has been deleted")
        }).catch(function (err) {
            res.status(500).send({
                success: false,
                message: 'Cannot delete books'
            })
        });
    }
}