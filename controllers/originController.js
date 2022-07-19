var Origin = require('../models/origin');
var Chocolate = require('../models/chocolate');
var async = require('async');
const { body, validationResult } = require("express-validator");

//Read
exports.origin_list = function(req, res, next) {
    Origin.find()
    .sort([['country', 'ascending']])
    .exec(function (err, list_origins) {
        if (err) {
            return next(err)
        }
        res.render('origin_list', {title: 'Browse by Origin', origin_list: list_origins})
    })
};

exports.origin_detail = function(req, res, next) {
    async.parallel({
        origin: function(cb) {
            Origin.findById(req.params.id)
            .exec(cb);
        },
        chocolates: function(cb) {
            Chocolate.find({ 'origin': req.params.id })
            .exec(cb);
        },
    }, 
    
    function(err, results) {
        if (err) {
            return next(err)
        }
        if (results.category === null) {
            var err = new Error('Origin not found');
            err.status = 404;
            return next(err);
        }
        res.render('origin_detail', { title: 'Origin', origin: results.origin, chocolates: results.chocolates })
    });
};

//Create
exports.origin_create_get = function(req, res, next) {
    res.render('origin_form', { title: 'Add an origin'} )
};

exports.origin_create_post = [
    body('country', 'Please indicate a country name.').trim().isLength({ min: 1}).escape(),
    body('plantation', 'Please indicate a plantation name.').trim().isLength({ min: 1}).escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        let origin = new Origin (
            {
                country: req.body.country,
                plantation: req.body.plantation
            }
        );
        if (!errors.isEmpty) {
            res.render('origin_form', { title: 'Add an origin', origin: origin, errors: errors.array() });
            return;
        }
        else {
            Origin.findOne({ 'country': req.body.country, 'plantation': req.body.plantation })
            .exec( function(err, found_origin) {
                if (err) {
                    return next(err);
                }
                if (found_origin) {
                    res.redirect(found_origin.url);
                }
                else {
                    origin.save(function(err) {
                        if (err) {
                            return next(err);
                        }
                        res.redirect(origin.url);
                    })
                }
            })
        }
    }
];

//Update
exports.origin_update_get = function(req, res) {
    res.send('origins update form')
};

exports.origin_update_post = function(req, res) {
    res.send('origins update post')
};

//Delete
exports.origin_delete_get = function(req, res, next) {
    async.parallel({
        origin(callback) {
            Origin.findById(req.params.id).exec(callback)
        },
        chocolates(callback) {
            Chocolate.find({ 'origin': req.params.id }).exec(callback)
        }
    },
    function (err, results) {
        if (err) {
            return next (err);
        }
        if (results.origin === null) {
            res.redirect('/origins');
        }
        res.render('origin_delete', { title: 'Delete Origin', origin: results.origin, chocolates: results.chocolates })
    });
};

exports.origin_delete_post = function(req, res, next) {
    async.parallel({
        origin(callback) {
            Origin.findById(req.params.id).exec(callback)
        },
        chocolates(callback) {
            Chocolate.find({ 'origin': req.params.id }).exec(callback)
        }
    },
    function (err, results) {
        if (err) {
            return next (err);
        }
        if (results.chocolates.length !== 0) {
            res.render('origin_delete', { title: 'Delete Origin', origin: results.origin, chocolates: results.chocolates });
            return;
        }
        else {
            Origin.findByIdAndRemove(req.params.id, function removeOrigin (err) {
                if (err) {
                    return next (err);
                }
                res.redirect('/origins');
            })
        }
    });
};