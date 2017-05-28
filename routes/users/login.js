var express = require('express');
var router = express.Router();
var models = require('../models');
var jwt = require('jsonwebtoken');
var app =  require('../index');

router.post('/user/login', function (req, res) {

    models.users.findOne({where:{username: req.body.Username},raw: true})
        .then(function (authUser) {
            if (authUser.Password != req.body.Password) {
                res.status(406).send({
                    success: false,
                    message: 'Invalid creddentials'
                });
            } else {
                var token = jwt.sign(authUser, app.get('superSecret'), {
                    expiresIn: 1440
                });
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        })
        .catch(function (err) {
            res.status(406).send({
                success: false,
                message: 'Invalid creddentials'
            });
        });
});

router.get('/users', function(req, res) {
    models.users.findAll({
    }).then(function(users) {
        res.send({
            title: 'Users: Bangla',
            users: users
        });
    });
});


module.exports = router;