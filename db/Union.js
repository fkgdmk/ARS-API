const mongoose = require('mongoose');

const union = new mongoose.Schema({
    name : {
        type: String
    }
});

module.exports = Union = mongoose.model('union', union);