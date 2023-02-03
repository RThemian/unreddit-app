  // add the image URL to the post data
    //   const postData = {
    //     author: req.body.author,
    //     title: req.body.title,
    //     content: req.body.content,
    //     imageRelated: result.secure_url
    //   };




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


 // const imageRelated = req.files.imageRelated;
    // imageRelated.mv(`./uploads/${imageRelated.name}`);
    
    // const fs = require('fs');
    // const path = require('path');
    // const projectRoot = path.resolve(__dirname, '..');

    // cloudinary.uploader.upload(`./uploads/${imageRelated.name}`, (err, result) => {
        // req.body.imageRelated = result.secure_url;
        // Post.create(req.body, (err, createdPost) => {
        //     // fs.unlink(`${projectRoot}/uploads/${imageRelated.name}`, (err) => {
        //         res.redirect('/posts'); // redirect to the books index page
        //     })
        // });
