var Category = require('../models/category');
var Chocolate = require('../models/chocolate');
var async = require('async');

//Read
exports.category_list = function(req, res, next) {
    Category.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_categories) {
        if (err) {
            return next(err)
        }
        res.render('category_list', {title: 'Browse by Category', category_list: list_categories})
    })
};

exports.category_detail = function(req, res, next) {
    async.parallel({
        category: function(cb) {
            Category.findById(req.params.id)
            .exec(cb);
        },
        chocolates: function(cb) {
            Chocolate.find({ 'category': req.params.id })
            .exec(cb);
        },
    }, 
    
    function(err, results) {
        if (err) {
            return next(err)
        }
        if (results.category === null) {
            var err = new Error('Category not found');
            err.status = 404;
            return next(err);
        }
        res.render('cat_detail', {title: 'Category', category: results.category, chocolates: results.chocolates})
    });
};