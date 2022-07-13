var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChocolateSchema = new Schema(
    {
        name: {type: String, required: true, maxLength: 100},
        desc: {type: String},
        price: {type: Number, required: true},
        origin: {type: Schema.Types.ObjectId, ref: 'Origin', required: true},
        category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
        stock: {type: Number, required: true}
    }
);

ChocolateSchema
.virtual('url')
.get(function () {
    return '/chocolate/' + this._id;
});

ChocolateSchema
.virtual('origin_string')
.get(function () {
    return this.origin.plantation + ' plantation, ' + this.origin.country;
});

module.exports = mongoose.model('Chocolate', ChocolateSchema);