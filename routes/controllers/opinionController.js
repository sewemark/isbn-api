var models = require('../../models');

module.exports = {

     getAll: function(req, res) {
         models.opinions.findAll({
         }).then(function(opinions) {
             res.status(200).send({
                 opinions: opinions
             });
         }).catch(function (err) {
             res.status(500).send({
                 success: false,
                 message: 'Cannot get opinions'
             })
         });
     },

    add: function(req, res) {
        models.opinions.create({
            Author:  req.body.author,
            IsUsers : req.body.isusers,
            CreateDate : req.body.createdate,
            Text:  req.body.text,
            Rate : req.body.rate,
            BookID :req.body.bookid,
            SourceID : req.body.sourceid
        }).then(function() {
            res.status(200).send("Opinion has been added");
        }).catch(function (err) {
            res.status(500).send({
                success: false,
                message: 'Cannot add opinion'
            })
        });
    },

    delete:function(req, res) {
        models.opinions.destroy({
            where: {
                id: req.params.opinion_id
            }
        }).then(function() {
            res.status(200).send("Opinion has beed deleted");
        }).catch(function (err) {
            res.status(500).send({
                success: false,
                message: 'Cannot delete opinion'
            })
        });
    }
}