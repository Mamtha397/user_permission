var express = require("express");
var app = express();
var port = 8000;
var mysql = require('mysql');
app.set('port',(process.env.port || port));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var bcrypt=require('bcryptjs');

var sql = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12393481",
    password: "zfl1FvP5LA",
    database: 'sql12393481'
});

sql.connect(function(err) {
    if (err) throw err;
});

app.get("/", (req, res) => {
    res.send("Hello world")
});

app.post("/dashboard", (req, res) => {
    var myData = new User({
        name:req.body.name,
        DOB:req.body.DOB,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,10),
        phone:req.body.phone
    });
    myData.save()
        .then(item => {
            console.log("Data Inserted");
            res.send("You've successfully signed up. <a href="+"/"+">Click Here</a>");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.post("/signup", (req, res) => {
    var myData = new User({
        name:req.body.name,
        DOB:req.body.DOB,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,10),
        phone:req.body.phone
    });
    myData.save()
        .then(item => {
            console.log("Data Inserted");
            res.send("You've successfully signed up. <a href="+"/"+">Click Here</a>");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.post("/login", (req, res) => {
        var email=req.body.email;
        // console.log(email+"=email password="+password);
        User.find({
            'email': email

         }, function(err, user) {
             if(user)
             {
                 try{
                //  console.log(user[0].password)
                 if(bcrypt.compareSync(req.body.password,user[0].password))
                 {
                        console.log("Success");
                        res.redirect('/?lo='+user[0]._id);
                 }
                 else{
                    console.log("wrong data");
                    res.send("Something went wrong <a href="+"/"+">Click Here</a>");
                 }
                }
                catch(err)
                {
                    console.log("wrong data");
                    res.send("Something went wrong <a href="+"/"+">Click Here</a>");
                }
                //console.log(user);
             }
        });
    });

app.listen(port, () => {
    console.log("Server listening on port " + port);
});