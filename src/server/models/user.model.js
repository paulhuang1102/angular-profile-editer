var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = Schema({
    email: {
        type: String, required: true, validate: function (email) {
            return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
        }
    },
    password: { type: String, required: true, min: 5 },
    name: { type: String, required: true },
    post: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

module.exports = mongoose.model('User', schema);