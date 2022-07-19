var Chocolate = require('../models/chocolate');
var Origin = require('../models/origin');
var Category = require('../models/category');
var async = require('async');
const { body,validationResult } = require('express-validator');

//Read
exports.chocolate_list = function(req, res, next) {
    Chocolate.find({}, 'name desc')
    .sort({name: 1})
    .exec(function (err, list_chocs) {
        if (err) {
            return next(err);
        };
        res.render('chocolate_list', { title: 'Browse all Chocolates', chocolates_list: list_chocs })
    });
};

exports.chocolate_detail = function(req, res, next) {
    async.parallel({
        chocolate: function(cb) {
            Chocolate.findById(req.params.id)
            .populate('origin')
            .populate('category')
            .exec(cb)
        },
    },
    function (err, results) {
        if (err) {
            return next(err)
        }
        if (results.chocolate === null) {
            var err = new Error('Chocolate not found');
            err.status = 404;
            return next(err);
        }
        res.render('choc_detail', { title: 'Chocolate', chocolate: results.chocolate })
    })
};

//Create
exports.chocolate_create_get = function(req, res, next) {
    async.parallel({
        origins(callback) {
            Origin.find(callback);
        },
        categories(callback) {
            Category.find(callback);
        },
     }, function (err, results) {
        if (err) {
            return next (err);
        }
        res.render('choc_form', { title: 'Add a chocolate', origins: results.origins, categories: results.categories })
     });
};

exports.chocolate_create_post = [
    body('name', 'Chocolate must have a name.').trim().isLength({ min: 1}).escape(),
    body('desc', 'Please provide a description of the chocolate').trim().isLength({ min: 1}).escape(),
    body('price', 'Chocolate must have a price').trim().isLength({ min: 1}),

    (req, res, next) => {
        const errors = validationResult(req);
        var chocolate = new Chocolate(
            {
                name: req.body.name,
                desc: req.body.desc,
                price: parseInt(req.body.price),
                origin: req.body.origin,
                category: req.body.category,
                stock: parseInt(req.body.stock)
            }
        );
        if (!errors.isEmpty()) {
            async.parallel({
                origins(callback) {
                    Origin.find(callback);
                },
                categories(callback) {
                    Category.find(callback);
                },
             }, function (err, results) {
                if (err) {
                    return next (err);
                }
                res.render('choc_form', { title: 'Add a chocolate', origins: results.origins, categories: results.categories, errors: errors.array() });
             });
             return;
        }
        else {
            chocolate.save(function (err) {
                if (err) {
                    return next (err);
                }
                res.redirect(chocolate.url)
            });
        }
    }
];

//Update
exports.chocolate_update_get = function(req, res) {
    res.send('delete form for chocolates')
};

exports.chocolate_update_post = function(req, res) {
    res.send('chocolate update post')
};

//Delete
exports.chocolate_delete_get = function(req, res, next) {
    async.parallel({
        chocolate(callback) {
            Chocolate.findById(req.params.id).exec(callback)
        }
    },
    function (err, results) {
        if (err) { 
            return next(err); 
        }
        if (results.chocolate==null) {
            res.redirect('/chocolates');
        }
        res.render('choc_delete', { title: 'Delete chocolate', chocolate: results.chocolate })
    });
};

exports.chocolate_delete_post = function(req, res, next) {
        Chocolate.findByIdAndRemove(req.params.id, function removeChoc(err) {
            if (err) {
                return next(err);
            }
            res.redirect('/chocolates')
        });
};