//Require Express
var express = require( 'express' );
var app = express();
var path = require( 'path' );
var session = require( 'express-session' );
var bodyParser = require( 'body-parser' );

//Other server configs
app.use(bodyParser.json());
app.use(express.static( __dirname + '/mainApp/dist'));
app.use(session({secret: "SecretOfTheSecret"}));

//Mongoose/MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mean_marketplace_api');

//Define Schema variable
var Schema = mongoose.Schema;

//Define User Schema
var UserSchema = new mongoose.Schema({
    first: { type: String, default: "" },
    last: { type: String, default: "" },
    email: { type: String, required: true, unique: true, minlength: 3 },
    password: { type: String, default: "" },
    listings: [{ type: Schema.Types.ObjectId, ref: 'Listing' }]
}, {timestamps: true});

//Deine Listing Schema
var ListingSchema = new mongoose.Schema({
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true, minlength: 3},
    description: { type: String, required: true, minlength: 3, maxlength: 200 },
    price: { type: Number, required: true, min: 1 },
    location: { type: String, required: true, minlength: 3 },
    imageUrl: { type: String, required: true, minlength: 3 }
}, {timestamps: true});

//Set models by passing them their respectie Schemas
mongoose.model('User', UserSchema);
mongoose.model('Listing', ListingSchema);

//Store models in variables
var User = mongoose.model('User');
var Listing = mongoose.model('Listing');
mongoose.Promise = global.Promise;

//Routes

//Login user
/*
1) check if user is in the database by email
2) If no user found, create a new one and add _id to session
3) If user found, add _id to session
*/
app.post('/api/users', function(req, res){
    User.findOne({email: req.body.email}, function(err, foundUser){
        if(err) {
            console.log('validation error');
            res.json(err);
        } else if(foundUser == null){
            //Create user
            console.log('no user found');
            var newUser = new User({email: req.body.email});
            newUser.save(function(err){
                if(err){
                    console.log('validation errors');
                    res.json(err);
                } else {
                    console.log('created user');
                    //Add user to session
                    req.session.userId = newUser._id;
                    res.json(newUser);
                }
            })
        } else {
            console.log("Logged in");
            req.session.userId = foundUser._id;
            res.json(foundUser);
        }
    })
})

//Get All Users
app.get('/api/users', function(req, res){
    User.find({}, function(err, users){
        if(err){
            console.log("Error from pulling users", err);
            res.json({message: "Error", error: err});
        } else {
            res.json(users);
        }
    })
})

//Get Current User
app.get('/api/users/current', function(req, res){
    if(req.session.userId != undefined){
        User.findOne({_id: req.session.userId}, function(err, foundUser){
            if(err){
                res.json(err);
            } else {
                res.json(foundUser);
            }
        })
    }else{
        res.json({errors: "No user found"});
    }
})








//Route all other routes to home
app.all('*', (req, res, next) => {
    res.sendFile(path.resolve( __dirname + '/mainApp/dist/index.html'));
}) 

//Listen to server
app.listen(4300, function(){
    console.log("Listening to 4300")
})