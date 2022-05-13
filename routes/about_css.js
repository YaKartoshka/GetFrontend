const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.render("/about_css.ejs"));
    
module.exports = router;