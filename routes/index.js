var express = require('express');
var router = express.Router();
var models = require('../models');
router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

router.get('/books', function(req, res) {
    models.books.findAll({
        //include: [ models.Task ]
    }).then(function(books) {
        res.send({
            title: 'Sequelize: Bangla',
            books: books
        });
    });
});

router.post('/book/create', function(req, res) {
    models.books.create({
        ISBN: req.body.isbn,
        Title: req.body.title,
        Author: req.body.author,
        PublishDate: req.body.publishDate,

    }).then(function() {
        res.redirect('/');
    });
});

router.get('/book/:book_id/delete', function(req, res) {
    models.books.destroy({
        where: {
            id: req.params.book_id
        }
    }).then(function() {
        res.redirect('/');
    });
});

module.exports = router;
