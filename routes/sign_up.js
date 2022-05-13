const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.sendFile(process.cwd()+"/sign_up.html"))
    .post((req, res) => res.send("POST SIGN UP"));
module.exports = router;