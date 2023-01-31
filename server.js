// require dependencies
const express = require('express');

// dotenv
require('dotenv').config();

// create express app
const app = express();

// define a simple route
// home page -- login / signup
app.get('/', (req, res) => {
    res.render('home.ejs');
});

//index page -- dashboard
app.get('/posts', (req, res) => {
    res.render('index.ejs');
});

// new

app.get('/posts/new', (req, res) => {
    res.render('new.ejs');
});

// delete
app.post('/posts/:id', (req, res) => {
    Post.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/posts');
    });
});

// update
app.put('/posts/:id', (req, res) => {
    res.redirect('/posts');
});

// edit
app.get('/posts/:id/edit', (req, res) => {
    res.render('edit.ejs');
});

// show
app.get('/posts/:id', (req, res) => {
    res.render('show.ejs');
});




const PORT = process.env.PORT;
// listen for requests
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});
