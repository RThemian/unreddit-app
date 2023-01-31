
const userSchema = new Schema({
    email: String,
    password: String,
    //avatar will be a 3rd party service API like gravatar
    avatar: String,
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

