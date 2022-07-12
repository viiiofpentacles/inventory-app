var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OriginSchema = new Schema(
    {
        country: {type: String, required: true},
        plantation: {type: String, required: true}
    }
);

module.exports = mongoose.model('Origin', OriginSchema);