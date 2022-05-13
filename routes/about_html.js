const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.sendFile(process.cwd()+"/About_HTML.html"))
    .post((req, res) => res.send("POST ABOUT HTML"));
module.exports = router;