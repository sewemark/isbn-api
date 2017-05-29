var express = require('express');
var router = express.Router();
var userController = require('./controllers/userController');
var bookController = require('./controllers/bookController');
var opinionController =require('./controllers/opinionController');
var authMiddleware = require('./middlewares/authMiddleware');

router.use(function(req, res, next) {
    console.log('First middleware.');
    next();
});

/* Users Public*/
router.route('/user/login').post(userController.login);
router.route('/user/create').post(userController.add);

router.use(authMiddleware.authMiddleware);

/* Users */
router.route('/users').get(userController.getAll);
router.route('/user/:user_id/shelve').post(userController.addBookToUserShelve);
router.route('/user/:user_id/shelve').get(userController.getUserShelve);
router.route('/user/:user_id/delete').get(userController.delete);

/* Books */
router.route('/books').get(bookController.getAll);
router.route('/book/create').post(bookController.add);
router.route('/book/:book_id/delete').get(bookController.delete);

/* Opinions */
router.route('/opinions').get(opinionController.getAll);
router.route('/opinion/create').post(opinionController.add);
router.route('/opinion/:opinion_id/delete').get(opinionController.delete);

module.exports = router;
