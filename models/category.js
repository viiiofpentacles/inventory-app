var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema(
    {
        name: {type: String, required: true, enum: ['Dark', 'Milk', 'White', 'Ruby']}
    }
);

module.exports = mongoose.model('Category', CategorySchema);