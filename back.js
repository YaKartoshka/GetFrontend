require('dotenv').config();

const express = require("express");
const path=require('path');
const app = express();
const port = process.env.PORT || 4000;
const https=require('https');
const apiKey="9d871ad2b9208dc3684541b72083256e";
const city="Nur-sultan";
const ownSite=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
const fs = require('fs');
const UserModel = require('./models/user.js')
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const methodOverride = require('method-override')
const passport=require('passport')
const userRoute=require('./routes/userRoutes.js')
let urlencodedParser = bodyParser.urlencoded({ extended: false });
const dbConfig = require('./config/database.config.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const cool = require('cool-ascii-faces');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session')
const MemoryStore = require('memorystore')(session)
const bcrypt = require('bcrypt');
const md5 = require('md5');
const cookieParser = require('cookie-parser')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000
    }),
    secret: "then we need to replace it to .env file",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', userRoute);
app.use(express.json());
mongoose.Promise=global.Promise;
mongoose.connect(dbConfig.url, { 
    useNewUrlParser: true
 }).then(() => { 
    console.log("База данных успешно подключена!!");     
}).catch(err => { 
    console.log('Не подключено', err); 
    process.exit(); 
});
app.use('/', userRoute)

app.use('/css', express.static(__dirname + '/public'))
const ejs=require('ejs');
const { response } = require("express");
app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));



app.get('/',function (req,res){
  res.render('sign_in');
    
})
app.get('/sign_in',function (req,res){
    res.render('sign_in');
      
  })
   
  

app.get("/index", function(req, res){
    if(req.isAuthenticated()){
        https.get(ownSite, function(response){
            response.on("data", function(data){
                const weatherData = JSON.parse(data);
                const temperature=weatherData.main.temp;
                res.render('index',{temperature: temperature+"C"})
            });
    
       });
    }else{
        res.redirect("sign_in")
    }
});


app.get('/about_css',function (req,res){
    https.get(ownSite, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temperature=weatherData.main.temp;
            res.render('about_css',{temperature: temperature+"C"})
        });

   });
    
})

app.get('/about_js',function (req,res){
    https.get(ownSite, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temperature=weatherData.main.temp;
            res.render('about_js',{temperature: temperature+"C"})
        });

   });
})
app.get('/about_html',function (req,res){
    https.get(ownSite, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temperature=weatherData.main.temp;
            res.render('about_html',{temperature: temperature+"C"})
        });

   });
})

app.get("/auth/google",
    passport.authenticate('google',{ scope: ["profile"] })
)

app.get('/auth/google/index',
    passport.authenticate('google', { failureRedirect: '/sign_up' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/index');
    });

app.get('/sign_up',function (req,res){
    res.render('sign_up')
})
app.get('/create',function (req,res){
   res.render('create')
})
app.get('/update',function (req,res){
    res.render('update')
    
})
app.get('/delete',function (req,res){
    res.render('delete')
    
})
app.get('/results',function (req,res){
    res.render('results')
    
})
app.get('/find',function (req,res){
    res.render('find')
})
app.post('/main',urlencodedParser,async (req,res)=>{
    if(!req.body.email && !req.body.password && !req.body.fullName){
        res.status(400).send({ message:"Must be filled!"});
    }
    console.log("launched")
const user = UserModel({
    email: req.body.email,
    password: req.body.password,
    fullName: req.body.fullName,
    root: 'user'
});
await user.save().then(data => {
 
    https.get(ownSite, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temperature=weatherData.main.temp;
            res.render('main',{temperature: temperature+"C"})
        });

   });
});
})
app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);



