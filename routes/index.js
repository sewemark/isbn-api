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

module.exports = router;
