var express = require('express');
var router = express.Router();
var models = require('../models');
var jwt = require('jsonwebtoken');
var app =  require('../index');
const defultRoleId  = 1;

router.use(function(req, res, next) {
    console.log('First middleware.');
    next();
});

router.post('/user/login', function (req, res) {

    models.users.findOne({where:{username: req.body.Username},raw: true})
        .then(function (authUser) {
            if (authUser.Password != req.body.Password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
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
        });
});

router.post('/user/create', function(req, res) {
    models.users.findOne({where:{username: req.body.Username},raw: true})
        .then(function (authUser) {

            if(authUser){
                return res.status(409).send({
                    success: false,
                    message: 'User already exist.'
                });
            } else
            {
                models.users.create({
                    Username :req.body.Username,
                    Password: req.body.Password,
                    IsActive: req.body.IsActive,
                    CreateDate :new Date(),
                    RoleID : defultRoleId
                }).then(function(user) {
                    console.log("&&&&&&&&&&&&&&&&&&");
                    console.log(user.id);
                    models.shelves.create({
                        UserID: user.id,
                    }).then(function (result) {
                        res.send(result);
                    })
                });
            }
        });
});
/*
router.use(function(req, res, next) {

    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});*/

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

    }).then(function(user) {
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



router.get('/user/:user_id/delete', function(req, res) {
    models.users.destroy({
        where: {
            id: req.params.user_id
        }
    }).then(function() {
        res.redirect('/');
    });
});


/* Shelves */

router.get('/user/:user_id/shelve', function(req, res) {
    models.users.findOne({
        where: {
            id: req.params.user_id

        },
        include: [
            { model: models.shelves
               //,include: [models.shelves.shelves_has_books]
            }
        ],
    }).then(function(user) {
        models.shelves.findOne({
            where: {
                id: user.shelf.ID
            },
            include: [
                {   model: models.books,
                    through: {
                        attributes: ['Title']
                    }
                    //    ,include: [models.shelves.books]
                }
            ],
        }).then(function(result) {
            res.send({
                books:result.books
                //    books:res
            });
        });
    });
});
router.post('/user/:user_id/shelve', function(req, res) {
    models.books.findOne({
        where :{
            Title:req.body.Title
        }
    }).then(function (result) {
       if(!result || result.length ==0){

           models.books.create({
               ISBN: "",
               Title: req.body.Title,
               Author: "",
               PublishDate: new Date()

           }).then(function(createdBook) {
               Add(createdBook);

           }).catch(function (err) {
               res.send("Error");
           });
       }
       else{
           Add(result);
       }

    });

    function Add(createdBook) {
        models.users.findOne({
            where: {
                id: req.params.user_id
            },
            include: [
                { model: models.shelves
                    //,include: [models.shelves.shelves_has_books]
                }
            ],
        }).then(function (user) {
            models.shelves_has_books.create({
                Shelves_ID: user.shelf.id,
                Shelves_UserID: user.id,
                Books_ID: createdBook.id,
            }).then(function(result) {
                res.status(200).send("created");
            }).catch(function(err) {
                // print the error details
                console.log(err);
                res.status(200).send("already exist");
            });
        })
    }
});
router.get('/shelves', function(req, res) {
    models.shelves_has_books.findAll({
    }).then(function(sh) {
        res.send({
            title: 'Users: Bangla',
            sh: sh
        });
    });
});

router.get('/user/test', function(req, res) {
    models.shelves.findAll({
        include: [
            {   model: models.books,
                through: {
                    attributes: ['Title']
                }
                //    ,include: [models.shelves.books]
            }
        ],
    }).then(function(opinions) {
        res.send({
            title: 'Opinions: Bangla',
            opinions: opinions
        });
    });

});

module.exports = router;
