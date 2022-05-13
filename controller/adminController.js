const req = require('express/lib/request');
const res = require('express/lib/response');
const AdminModel = require('../models/admin.js')
const https=require('https');
const apiKey="9d871ad2b9208dc3684541b72083256e";
const city="Nur-sultan";
const ownSite=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


exports.create= async (req,res)=>{
    if(!req.body.email && !req.body.password && !req.body.fullName){
        res.status(400).send({ message:"Must be filled!"});
    }
    console.log("launched")
const admin = AdminModel({
    email: req.body.email,
    password: req.body.password,
    fullName: req.body.fullName,
    root: 'admin'
});
await admin.save().then(data => {
 
    res.render('results', {mydata: "admin "+ data.fullName +" created succesfully!"})
}).catch(err => {
  
    res.render('results', {mydata: err.message || "Some error occurred while creating user"})
});
};


