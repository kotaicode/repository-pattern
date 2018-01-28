var mongoose = require("mongoose");

// Model keeps the minimal details.
// At a later point, this file might be replaced with js-interface to cockroachDB and
// if that js-interface implements
// the APIs used from repo, all will work smoothly
var TinyUrlSchema = new mongoose.Schema({
  full_url: String,
  tiny_url: String,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("TinyUrl", TinyUrlSchema);
