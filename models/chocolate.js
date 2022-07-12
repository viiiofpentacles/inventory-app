var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChocolateSchema = new Schema(
    {
        name: {type: String, required: true, maxLength: 100},
        desc: {type: String},
        price: {type: Number},
        origin: {type: Schema.Types.ObjectId, ref: 'Origin', required: true},
        category: {type: Schema.Types.ObjectId, ref: 'Category', required: true}
    }
);

ChocolateSchema
.virtual('url')
.get(function () {
    return '/chocolates/' + this._id;
});

ChocolateSchema
.virtual('origin string')
.get(function () {
    return this.origin.plantation + ',' + this.origin.country;
});

module.exports = mongoose.model('Chocolate', ChocolateSchema);