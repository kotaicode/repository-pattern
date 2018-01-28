const TinyUrlRepo = require("../repos/tinyurls.js");

module.exports = {
  show: function(req, res, next) {
    // Initialise the repository
    var tinyUrl = new TinyUrlRepo();

    // Call the method to fid in the repository;
    // To decide whether it is an error or not, is the responsibility of the repo
    tinyUrl.Find(req.params.tiny, function(err, url) {
      if (err) return res.status(500).send(err);
      if (!url) {
        return res.status(404).send({ error: "that tiny url is not known" });
      }

      return res.redirect(url.full_url);
    });
  },

  create: function(req, res, next) {
    // Just make sure to have the input
    // Validation will happen in the repository
    if (!req.body || !req.body.full_url)
      return res.status(400).send({ error: "input is incomplete" });

    // Initialise repo
    var tinyUrl = new TinyUrlRepo();

    // Leave it to the repo to take care of  the logic
    // The controller handles only the input (above) and output (here)
    tinyUrl.Create(req.body.full_url, function(err, post) {
      if (err) return res.status(500).send(err);
      res.json(post);
    });
  }
};
