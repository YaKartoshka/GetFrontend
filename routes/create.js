const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.render("create"))
module.exports = router;