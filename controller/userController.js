const req = require('express/lib/request');
const res = require('express/lib/response');
const UserModel = require('../models/user.js')
const https=require('https');
const apiKey="9d871ad2b9208dc3684541b72083256e";
const city="Nur-sultan";
const ownSite=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
const bodyParser=require('body-parser');
const passport=require('passport');
const { redirect } = require('express/lib/response');
exports.register = async (req, res) => {
    UserModel.register({username: req.body.username}, req.body.password, function (err, user) {
        if (err){
            console.log(err)
            res.redirect("/sign_up")
        }else {
            passport.authenticate("local")(req, res, function () {
                https.get(ownSite, function(response){
                    response.on("data", function(data){
                        const weatherData = JSON.parse(data);
                        const temperature=weatherData.main.temp;
                        res.render('index',{temperature: temperature+"C"})
                    });
            
               });
            });
        }
    })
  
};

exports.login = async (req, res) => {
    
        let user =new UserModel({
            username:req.body.username,
            password:req.body.password
        })

        req.login(user, function (err){
            if (err){
                console.log(err)
                redirect("/sign_in")
            }else {
                passport.authenticate("local")(req, res, function () {
                    https.get(ownSite, function(response){
                        response.on("data", function(data){
                            const weatherData = JSON.parse(data);
                            const temperature=weatherData.main.temp;
                            res.render('index',{temperature: temperature+"C"})
                        });
                
                   });
                });
            }
        })
    }
    

exports.findAll = async (req, res) => {
try {
    console.log("launched")
    const user = await UserModel.find();
    res.status(200).json(user);
} catch(error) {
    res.status(404).json({message: error.message});
}
};

exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.query.email}).exec(); 
        
        if (user===null){
            res.status(200).render('results', {mydata: "user not found"
            })
        }else{
            res.status(200).render('results', {mydata: "user :"+ user.email +" "
                    + user.fullName +" "+ user.password
            })
        }

    } catch(error) {
 
        res.status(404).render('results', {mydata: error.message})
    }
};

exports.update = async (req, res) => {
if(!req.body) {
    res.status(400).send({
        message: "Data to update can not be empty!"
    });
}
console.log("launched")
const id = req.body.oldEmail;

await UserModel.findOneAndUpdate({email: query}, {email:req.body.newEmail,
    fullName:req.body.newfullName,
    password:req.body.newpassword,
   
}).then(data => {
    console.log(data)
    if (!data) {
        
        res.status(404).render('results', {mydata: `User not found.`})
    }else{
    
        res.render('update');
    }
}).catch(err => {

    res.status(500).render('results', {mydata: err.message})
});
};

exports.destroy = async (req, res) => {
   
    let useremail=req.body.email
    await UserModel.deleteOne({email: req.body.email}).then(data => {
 
        if (data.deletedCount===0) {
  
            res.status(404).render('results', {mydata: "User not found"})

        } else {
     

            res.render('results', {mydata: "user "+useremail+" deleted succesfully!"})
        }
    }).catch(err => {
        
        res.status(500).render('results', {mydata: err.message})
    });
};

exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find();
        console.log("launched")
        res.status(200).render('results', {mydata: user})
    } catch(error) {
        res.status(404).render('results', {mydata: error.message})
       
    }
};