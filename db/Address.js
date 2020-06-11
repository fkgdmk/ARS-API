const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const address = new mongoose.Schema({
    streetName : {
        type: String
    },
    number : {
        type: String
    },
    zipCode : {
        type: String
    },
    union: {
        type : Schema.Types.ObjectId, ref: 'union'
    }
});

module.exports = Address = mongoose.model('address', address, 'address');