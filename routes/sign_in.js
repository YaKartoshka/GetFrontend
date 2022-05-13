const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.sendFile(process.cwd()+"/sign_in.html"))
    .post((req, res) => res.send("POST Sign IN"));
module.exports = router;