const mongoose = require('mongoose');
const {Schema} = mongoose;

const blogSchema = new Schema({
    judul : {
        type: String,
        require : true
    },
    deskripsi : {
        type: String,
        require : true
    },
    tanggalUpload :{
        type: Date,
        default: Date.now()
    }
})

const Blog = mongoose.model("Blog", blogSchema)

module.exports= Blog;