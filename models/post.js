const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// model schema for a post
const postSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    content: {type: String, required: true},
    upvotes: Number,
    downvotes: Number,
    // image will be a 3rd party service API like cloudinary
    imageRelated: {
        type: String,
        default: 'https://res.cloudinary.com/ds6pu1vmi/image/upload/v1674694775/omnyy7rbtrskycbkwswi.jpg'
      },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]

});

module.exports = mongoose.model('Post', postSchema);