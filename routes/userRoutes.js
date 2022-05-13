const express = require('express')
const bodyParser=require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false });
const userController = require('../controller/userController')
const router = express.Router();
const adminController = require('../controller/adminController')
router.patch('/:email',urlencodedParser, userController.update);
router.delete('/delete/:email', userController.destroy);
router.get('/find/:email',urlencodedParser, userController.findOne);
router.post('/',urlencodedParser, adminController.create);
router.get('/results/', urlencodedParser,userController.findAll);

module.exports= router