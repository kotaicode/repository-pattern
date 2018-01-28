var TinyUrlModel = require("../models/tinyurls.js");
const crypto = require("crypto");
const bs58 = require("bs58");

module.exports = class TinyUrl {
  constructor() {}

  // A URL needs to be shortened. That's our business, and the logic of how we do it goes here
  Create(full_url, callback) {
    // Validation (the business logic may support various formats, and that shall be known to the repo)
    if (!this.ValidURL(full_url)) {
      return callback({ error: "the provided url is not valid" }, null);
    }

    // Actual processing of the input happens here
    const hash = crypto.createHash("sha256");
    hash.update(full_url);
    let b58Bytes = Buffer.from(hash.digest("hex"), "hex");

    // Create the object
    var tinyUrl = {
      full_url: full_url,
      tiny_url: bs58.encode(b58Bytes).substr(0, 10)
    };

    // The actual means of saving/database operations, etc. are not the responsibility of the repo, call the model to do that
    return TinyUrlModel.create(tinyUrl, callback);
  }

  Find(tiny_url, callback) {
    // The logic is simple here. But might have special logic in future
    return TinyUrlModel.findOne({ tiny_url: tiny_url }, callback);
  }

  ValidURL(str) {
    /*
     * Imagine that at some point of time, we need to change the accepted url format, then we change it here
     * NOT in model -- because it might need migrations
     * NOT in controller -- because controllers are simple input output interfaces.
     * const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
     */
    const regexp = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    return regexp.test(str);
  }
};
