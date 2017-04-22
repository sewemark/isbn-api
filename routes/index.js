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
        PublishDate: req.body.publishdate,

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
        BookID :req.body.bookid,
        SourceID : req.body.sourceid

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


/* Users */

router.get('/users', function(req, res) {
    models.users.findAll({
    }).then(function(users) {
        res.send({
            title: 'Users: Bangla',
            users: users
        });
    });
});
const defultRoleId  = 1;

router.post('/user/create', function(req, res) {
    models.users.create({
        Username :req.body.Username,
        Password: req.body.Password,
        IsActive: req.body.IsActive,
        CreateDate :new Date(),
        RoleID : defultRoleId

    }).then(function() {
        res.send(req.body);
    });
});

router.get('/user/:user_id/delete', function(req, res) {
    models.users.destroy({
        where: {
            id: req.params.user_id
        }
    }).then(function() {
        res.redirect('/');
    });
});

module.exports = router;
