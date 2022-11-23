const Blog = require("../models/blogs");
module.exports= {

    getAllBlog: async (req, res)=>{
            const blog = await Blog.find({})
            try {
                res.status(200).json({
                    message :"success",
                    data: blog
                  })
            } catch (error) {
                res.status(500).json({
                    message :"error"
                  })
            }
           
    },

    getBlogById: async (req, res)=>{
        const { id } = req.params

        const blog = await Blog.findById(id)
        try {
            res.status(200).json({
                message :"success",
                data: blog
              })
        } catch (error) {
            res.status(404).json({
                message :"error"
              })
        }
       
    },

    postBlog: async (req, res)=>{
        const data = req.body
        const blog = await Blog(data)

        try {
            blog.save()
            res.status(200).json({
            message : "luluk pintar"
            })
        } catch (error) {
            res.status(404).json({
            message : "error"
            })
        }
       
    },

    updateBlogById: async (req, res)=>{
        const data = req.body
        const { id } = req.params
        const update = await Blog.updateOne({_id: id},data);
        try {
            res.status(200).json({
                message: "Selamat tidak error *emot jempol",
                data : update
            })
        } catch (error) {
            res.status(404).json({
                message: "error bang"
            })
        }
    },

    deleteBlogById: async (req, res)=>{
        const { id } = req.params
        console.log(id);
        try {
            await Blog.deleteOne({_id: id})
            res.status(200).json({
            message: "Selamat tidak error *emot jempol"
            
        })
        } catch (error) {
            res.status(404).json({
            message: "error"
        })
        }
    }
}