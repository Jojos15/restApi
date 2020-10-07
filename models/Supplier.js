const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'can\'t be blank']
    },
    email: {
        type: String,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    phone: {
        type: String, //TODO: Change type to something more suitable
    }
});

module.exports = mongoose.model('Supplier', supplierSchema);