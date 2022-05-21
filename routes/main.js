const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.sendFile(process.cwd()+"main"))
    .post((req, res) => res.send("POST MAIN"));
module.exports = router;
