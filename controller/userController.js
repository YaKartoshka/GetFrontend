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
                        res.cookie(`email`,`${req.body.username} and ${req.body.password}`);
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
    exports.create = async (req, res) => {
        if (!req.body.username && !req.body.fullName && !req.body.password) {
            
            console.log("empty")
        }
        console.log("working");
        const user = new UserModel({
            username: req.body.username,
            fullName: req.body.fullName,
            
            password: req.body.password
        });
        
        await user.save().then(data => {
           
            console.log(`user "+ ${data.fullName} +" created succesfully!`)
            res.render('create')
        }).catch(err => {
           
                  console.log(err);
        });
    };

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
        const user = await UserModel.findOne({username: req.query.username}).exec(); 
        
        if (user===null){
            res.status(200).render('results', {mydata: "user not found"
            })
        }else{
            res.status(200).render('results', {mydata: "user :"+ user.username +" "
                    + user.fullName +" "+ user.password
            })
        }

    } catch(error) {
 
        res.status(404).render('results', {mydata: error.message})
    }
};

exports.update = async (req, res) => {

    if (!req.body.newemail || !req.body.newfullName || !req.body.newpassword || !req.body.username) {
       
        res.status(400).render('results', {mydata: "Data to update can not be empty!"})
        return
    }

   
    const query = req.body.username;

   
    await UserModel.findOneAndUpdate({username: query}, {username:req.body.newemail,
        fullName:req.body.newfullName,
        password:req.body.newpassword,
        username:req.body.newEmail
    }).then(data => {
        console.log(data)
        if (!data) {
            console.log("User not found");
            res.render('update')
        }else{
            console.log("User updated");
            res.render('update')
        }
    }).catch(err => {
        console.log(err);
        res.render('update')
    });
};

exports.destroy = async (req, res) => {


    let useremail=req.body.username
    await UserModel.deleteOne({username: useremail}).then(data => {
   
        if (data.deletedCount===0) {
         
            console.log("User not found")

        } else {
            
            console.log("user "+useremail+" deleted succesfully!")
            res.render('delete')
        }
    }).catch(err => {
     
       console.log(err);
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