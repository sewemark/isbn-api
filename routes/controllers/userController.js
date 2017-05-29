var models = require('../../models');
var jwt = require('jsonwebtoken');
var app = require('../../index');
const defultRoleId =1;

module.exports = {
    login:function (req,res) {
        models.users
            .findOne({
                where:{username: req.body.Username},raw: true
            })
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
                    res.status(200).json({
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
    },

    getAll :function (req,res) {
        models.users.findAll({
        }).then(function(users) {
            res.status(200).send({
                users: users
            });
        }).catch(function (err) {
            res.status(404).send({
                success: false,
                message: 'Users not found'
            });
        })
    },

    add:function(req, res) {
        models.users.findOne({where:{username: req.body.Username},raw: true})
            .then(function (authUser) {
                if(authUser){
                    return res.status(409).send({
                        success: false,
                        message: 'User already exist.'
                    });
                }
                else {
                    models.users.create({
                        Username :req.body.Username,
                        Password: req.body.Password,
                        IsActive: req.body.IsActive,
                        CreateDate :new Date(),
                        RoleID : defultRoleId
                    }).then(function(user) {
                        models.shelves.create({
                            UserID: user.id,
                        }).then(function (result) {
                            res.status(200).send(result);
                        }).catch(function (err) {
                            res.status(500).send({
                                success: false,
                                message: 'Users shelve has not been added'
                            });
                        })
                    }).catch(function (err) {
                        res.status(500).send({
                            success: false,
                            message: 'Users has not been added'
                        });
                    })
                }
            }).catch(function (err) {
                res.status(500).send({
                success: false,
                message: 'Users has not been added'
            });
        })
    },

    addBookToUserShelve:function(req, res) {
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
                    _addBookToUserShelve(createdBook);

                }).catch(function (err) {
                    res.status(500).send({
                        success: false,
                        message: 'Cannot add book'
                    })
                });
            }
            else{
                _addBookToUserShelve(result);
            }
        }).catch(function (err) {
            res.status(500).send({
                success: false,
                message: 'Cannot add book'
            })
        });
    },

    getUserShelve: function(req, res) {
        models.users.findOne({
            where: {
                id: req.params.user_id
            },
            include: [{
                    model: models.shelves
            }],
        }).then(function(user) {
                models.shelves.findOne({
                    where: {
                        id: user.shelf.ID
                    },
                    include: [{
                            model: models.books,
                            through: {
                                attributes: ['Title']
                            }
                        }],
                }).then(function(result) {
                    res.status(200).send({
                        books:result.books
                    });
                });
             }).catch(function (err) {
                res.status(500).send({
                    success: false,
                    message: 'Users does not exist'
                });
             });
    },

    delete : function(req, res) {
        models.users.destroy({
            where: {
                id: req.params.user_id
            }
        }).then(function() {
            res.status(200).send({
                success: false,
                message: 'Users has been deleted'
            });
        }).catch(function (err) {
            res.status(500).send({
                success: false,
                message: 'Users does not exist'
            });
        });

    }
}

function _addBookToUserShelve(createdBook) {
    models.users.findOne({
        where: {
            id: req.params.user_id
             },
        include: [{
                model: models.shelves
            }],
    }).then(function (user) {
        models.shelves_has_books.create({
            Shelves_ID: user.shelf.id,
            Shelves_UserID: user.id,
            Books_ID: createdBook.id,
        }).then(function(result) {
            res.status(200).send("created");
        }).catch(function(err) {
            res.status(200).send("already exist");
        });
    }).catch(function(err) {
        res.status(404).send("User not found");
    });
}
