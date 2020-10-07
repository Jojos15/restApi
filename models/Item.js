const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    fullname: {
        type: String,
        required: true
    },
    code: {
        type: String,
    },
    quantity: {
        type: String
    },
    supplierid: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Item', itemSchema);
