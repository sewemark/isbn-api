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
        Title: "test2",
        Author: "test3",
        PublishDate: "01-01-2001",

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


/* Opinions */

router.get('/opinions', function(req, res) {
    models.opinions.findAll({
    }).then(function(opinions) {
        res.send({
            title: 'Opinions: Bangla',
            opinions: opinions
        });
    });
});

router.post('/opinion/create', function(req, res) {
    models.opinions.create({
        Author:  req.body.author,
        IsUsers : req.body.isusers,
        CreateDate : req.body.createdate,
        Text:  req.body.text,
        Rate : req.body.rate,

    }).then(function() {
        res.redirect('/');
    });
});

router.get('/opinion/:opinion_id/delete', function(req, res) {
    models.opinions.destroy({
        where: {
            id: req.params.opinion_id
        }
    }).then(function() {
        res.redirect('/');
    });
});

module.exports = router;
