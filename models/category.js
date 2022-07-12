var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema(
    {
        name: {type: String, required: true, enum: ['Dark', 'Milk', 'White', 'Ruby']}
    }
);

OriginSchema
.virtual('url')
.get(function () {
    return '/categories/' + this._id;
});

module.exports = mongoose.model('Category', CategorySchema);