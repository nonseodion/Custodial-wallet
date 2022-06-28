const mongoose = require("mongoose");

const bitcoinSchema = mongoose.Schema({
  email: { type: String, default: null, unique: true },
  index: { type: Number, default: null },
  address: { type: Number, default: null },
  balance: { type: Number, default: null },
  addressBalance: { type: Number, default: null },
});

module.exports = mongoose.model("bitcoin", bitcoinSchema);
