var express = require("express");
var router = express.Router();
var controller = require("../controllers/tinyurls.js");

/* GET SINGLE TINYURL BY ID */
router.get("/:tiny", controller.show);

/* CREATE TINYURL */
router.post("/", controller.create);

module.exports = router;
