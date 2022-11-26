const mongoose = require('mongoose');
const {Schema} = mongoose;
const User = require('./user').schema;

const blogSchema = new Schema({
    image : {
        data : Buffer,
        contentType : String,
    },
    title : {
        type: String,
        require : true
    },
    subTitle : {
        type: String,
        require : true
    },
    description :{
        type: String,
        require : true
    },
    dateCreated :{
        type: Date,
        default: Date.now()
    },
    createdBy :{
        type : Schema.Types.ObjectId,
        ref : 'User' 
    }
});

const commentSchema = new Schema({
    content :{
        type : String,
        require : true,
    },
    postedBy : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    datePosted: {
        type : Date,
        default : Date.now()
    }
})


const Blog = mongoose.model("Blog", blogSchema)
const Comment = mongoose.model("Comment", commentSchema)

module.exports= {Blog, Comment};