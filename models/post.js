const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// model schema for a post
const postSchema = new Schema({
    author: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    upvotes:{type: Number, default: 0},
    downvotes: {type: Number, default: 0},
    // image will be a 3rd party service API like cloudinary
    imageRelated: {
        type: String,
        default: 'https://res.cloudinary.com/ds6pu1vmi/image/upload/v1674694775/omnyy7rbtrskycbkwswi.jpg'
      },
    // comments: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Comment'
    // }]

});

module.exports = mongoose.model('Post', postSchema);