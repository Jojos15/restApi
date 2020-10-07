const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'can\'t be blank']
    },
    email: {
        type: String,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    }
});

module.exports = mongoose.model('Supplier', supplierSchema);