var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OriginSchema = new Schema(
    {
        country: {type: String, required: true},
        plantation: {type: String, required: true}
    }
);

OriginSchema
.virtual('url')
.get(function () {
    return '/origin/' + this._id;
});

OriginSchema
.virtual('name')
.get(function () {
    return this.country + ', ' + this.plantation + ' plantation';
})

module.exports = mongoose.model('Origin', OriginSchema);