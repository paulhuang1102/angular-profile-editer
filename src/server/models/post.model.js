var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = ({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    name: { type: String, required: true },
    images: { type: Array },
    info: { type: String },
    add_date: { type: Date, default: Date.now, required: true },
    modify_date: { type: Date, default: Date.now, required: true },
    score: { type: Number, default: 0 }
});

module.exports = mongoose.model('Post', schema);