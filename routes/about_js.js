const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.sendFile(process.cwd()+"/About_JS.html"))
    .post((req, res) => res.send("POST ABOUT JS"));
module.exports = router;