const mongoose = require("mongoose");

const Expense = mongoose.model("Expense", {
  description: {
    type: String,
    required: true,
    maxlength: 25
  },
  amount: { type: Number, min: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = Expense;
