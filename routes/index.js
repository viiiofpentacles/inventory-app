var express = require('express');
var router = express.Router();
var chocolate_controller = require('../controllers/chocolateController');
var origin_controller = require('../controllers/originController');
var category_controller = require('../controllers/categoryController');

// GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chocolate Inventory' });
});

//chocolate routes
router.get('/chocolate/create', chocolate_controller.chocolate_create_get);
router.post('/chocolate/create', chocolate_controller.chocolate_create_post);
router.get('/chocolate/:id/delete', chocolate_controller.chocolate_delete_get);
router.get('/chocolate/:id/delete', chocolate_controller.chocolate_delete_post);
router.get('/chocolate/:id/update', chocolate_controller.chocolate_update_get);
router.get('/chocolate/:id/update', chocolate_controller.chocolate_update_post);
router.get('/chocolate/:id', chocolate_controller.chocolate_detail);
router.get('/chocolates', chocolate_controller.chocolate_list);

//origins routes
router.get('/origin/create', origin_controller.origin_create_get);
router.post('/origin/create', origin_controller.origin_create_post);
router.get('/origin/:id/delete', origin_controller.origin_delete_get);
router.get('/origin/:id/delete', origin_controller.origin_delete_post);
router.get('/origin/:id/update', origin_controller.origin_update_get);
router.get('/origin/:id/update', origin_controller.origin_update_post);
router.get('/origin/:id', origin_controller.origin_detail);
router.get('/origins', origin_controller.origin_list);

//category route
router.get('/category/:id', category_controller.category_detail);
router.get('/categories', category_controller.category_list);

module.exports = router;
