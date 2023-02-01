// require dependencies
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const Post = require('./models/post.js');
const cloudinary = require('cloudinary');

const fileUpload = require('express-fileupload');
const userRouter = require('./controllers/users.js');

const postRouter = require('./controllers/posts.js');

// dotenv
require('dotenv').config();

// create express app
const app = express();


cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
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
    console.log(req.session);
    next(); // this is a middleware function that will run on every request and log the session to the console, runs the next function in the middleware stack

});
// this is a middleware function that will run on every request and log the session to the console, runs the next function in the middleware stack
app.use((req, res, next) => {
    // custom middleware to inspect the session
    if(req.session.userId) {
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

// make a seed route

// app.get('/posts/seed', (req, res) => {
//     // use the data from data.js but first delete any posts that already exist from data.js
//     Post.deleteMany({}, (err, data) => {
//         Post.create(posts, (err, data) => {
//             res.redirect('/posts');
//         });
//     });
// });

    

//index page -- dashboard
// app.get('/posts', (req, res) => {
//     Post.find({}, (err, allPosts) => {
        
//         res.render("index.ejs", {
//             posts: allPosts
//             })
//     })
// })


// new

// app.get('/posts/new', (req, res) => {
//     res.render('new.ejs');
// });

// delete
// app.post('/posts/:id', (req, res) => {
//     Post.findByIdAndRemove(req.params.id, (err, data) => {
//         res.redirect('/posts');
//     });
// });

// update
// app.put('/posts/:id', (req, res) => {
//     res.redirect('/posts');
// });

// edit
// app.get('/posts/:id/edit', (req, res) => {
//     res.render('edit.ejs');
// });

// show
// app.get('/posts/:id', (req, res) => {
//     Post.findById(req.params.id, (err, foundPost) => {
//         if (err) {
//             console.log(err);
//             res.redirect('/posts');
//         } else {
//             res.render('show.ejs', { post: foundPost });
//         }
//     });
// });



app.use(userRouter);
app.use(postRouter);

const PORT = process.env.PORT;
// listen for requests
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});
