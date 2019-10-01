const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: {
    type: String,
    maxlength: 15,
    lowercase: true,
    required:true,
    trim: true
  }
});

module.exports = User;
