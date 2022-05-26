const express = require('express')
const bodyParser=require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false });
const userController = require('../controller/userController')
const router = express.Router();
const adminController = require('../controller/adminController')
router.patch('/update/:username',urlencodedParser, userController.update);
router.delete('/delete/:username', userController.destroy);
router.get('/find/:email',urlencodedParser, userController.findOne);
router.post('/register',urlencodedParser, userController.register);
router.post('/login',urlencodedParser, userController.login);
router.get('/results/', urlencodedParser,userController.findAll);
router.post('/create',urlencodedParser, userController.create);
module.exports= router