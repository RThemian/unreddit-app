// require dependencies
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const Post = require('./models/post.js');
const cloudinary = require('cloudinary');

const fileUpload = require('express-fileupload');
const usersRouter = require('./controllers/users.js');

const postsRouter = require('./controllers/posts.js');

// dotenv
require('dotenv').config();

// create express app
const app = express();


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });


  //connect to database
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URL);


const db = mongoose.connection;

db.on('error', (err) => console.error(err.message + ' is Mongo not running?'));
db.on('connected', () => console.log('mongoDB connected: '));


// mount middleware
// grab form data and add it to req.body
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
    })
);

// pass in a settings object to configure the file upload middleware
app.use(fileUpload({createParentPath: true}));


app.use((req, res, next) => {
    // custom middleware to inspect the session
    console.log(req.session.email);
    next(); // this is a middleware function that will run on every request and log the session to the console, runs the next function in the middleware stack

});
// this is a middleware function that will run on every request and log the session to the console, runs the next function in the middleware stack
app.use((req, res, next) => {
    // custom middleware to inspect the session
    if(req.session.userId) {
        //res.locals.user = req.session.userId;
        res.locals.user = req.session.userId;
    } else {
        res.locals.user = null;
    }
    next(); // this is a middleware function that will run on every request and log the session to the console, runs the next function in the middleware stack
});

function isAuthenticated(req, res, next) {
    if(!req.session.userId) {
        return res.redirect('/login'); 
    }
    // res.locals is an object that is available in all of the views and can be used to pass data to the views
    next();
}
// define a simple route
//home page -- login / signup
app.get('/', (req, res) => {
    res.render('home.ejs');
});




app.use(usersRouter);
app.use(postsRouter);

const PORT = process.env.PORT;
// listen for requests
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});
