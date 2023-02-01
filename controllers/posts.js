const express = require('express');
//require the Post
const Post = require("../models/post.js");
const cloudinary = require('cloudinary').v2;
const router = express.Router();

// seed route
const data = require('../data');

router.get('/posts/seed', (req, res) => {
    Post.deleteMany({}, (err, results) => {
        Post.create(data, (err, posts) => {
            res.redirect('/posts');
        })
    })
});

// INDUCES routes

// index route
router.get("/posts", (req, res) => {
    Post.find({}, (error, allPosts) => {
        res.render("index.ejs", {
            posts: allPosts,
        })
    })
})

// new route
router.get("/posts/new", (req, res) => {
    res.render("new.ejs")
})

// delete route
router.delete("/posts/:id", (req, res) => {
    Post.findByIdAndDelete(req.params.id, (err, deletedPost) => {
        res.redirect("/posts")
    })
})

// update route
router.put("/posts/:id", (req, res) => {
   
    Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        (err, updatedPost) => {
            res.redirect(`/posts/`)
        }
    )
})

// create route
router.post('/posts', (req, res) => {
    
    console.log(req.files);

    const imageRelated = req.files.imageRelated;
   imageRelated.mv(`./uploads/${imageRelated.name}`);

    cloudinary.uploader.upload(`./uploads/${imageRelated.name}`, (err, result) => {
        console.log(err, result);

        req.body.imageRelated = result.secure_url;

        Post.create(req.body, (err, createdPost) => {
            res.redirect("/posts")
        });
    })
})

// edit route
router.get("/posts/:id/edit", (req, res) => {
    Post.findById(req.params.id, (err, foundPost) => {
        res.render("edit.ejs", {
            post: foundPost,
        })
    })
})

// show route
router.get("/posts/:id", (req, res) => {
    Post.findById(req.params.id, (err, foundPost) => {
        res.render("show.ejs", {
            post: foundPost
        })
    })
})

module.exports = router;