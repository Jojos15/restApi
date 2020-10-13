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
  expiredat: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('LoggedInUser', loggedInUserSchema);
