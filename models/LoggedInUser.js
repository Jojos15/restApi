const mongoose = require("mongoose");

const loggedInUserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  iat: {
    type: Number,
    required: true
  },
  expireAt: {
    type: Date,
    index: { expires: '60m' },
    required: true
  }
})

module.exports = mongoose.model('LoggedInUser', loggedInUserSchema);
