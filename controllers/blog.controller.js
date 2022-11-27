const Blog = require("../models/blogs");
const Comment = require("../models/blogs");
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
// const uploadFiles = require('../uploadImage')

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

    // multer
    // postBlog: async (req, res)=>{
    //     const data = req.files;
    //     console.log(data);
        

    //     // const data = {
    //     //     image : {
    //     //     data: fs.readFileSync(path.join('/uploadImage/' + req.files.uploadFiles)),
    //     //     contentType: ["image/png", "image/jpeg"]
    //     // },
    //     //     judul : req.body.judul,
    //     //     subJudul : req.body.subJudul,
    //     //     deskripsi : req.body.deskripsi,
    //     // }

    //     // const blog = await Blog(data)

    //     try {
    //         blog.create(data)
    //         res.status(200).json({
    //         message : "success"
    //         })
    //     } catch (error) {
    //         res.status(404).json({
    //         message : "error"
    //         })
    //     }
       
    // },


    // formidable
    postBlog: async (req, res, next)=>{
        // membuat objek form dari formidable untuk mengambil data dari form
        const form = new formidable.IncomingForm();
        console.log(form);
        const uploadsFolder = path.join(__dirname+'./public/imageBlog')
       
        form.uploadDir = uploadsFolder

        form.parse(req, async (err, fields, files)=>{
            console.log("fields");
            console.log(fields);
            console.log("files");
            console.log(files);

            if(err){
                console.log("error parsing files");
                return res.satus(400).json({
                    message: "error parsing files"
                })
            }

            const file = files.image
            const isFileValid = (file) => {
                const type = file.type.split("/").pop();
                const validTypes = ["jpg", "jpeg", "png", "pdf"];
                if (validTypes.indexOf(type) === -1) {
                  return false;
                }
                return true;
              };
            const isValid =isFileValid(file)

            const fileName = encodeURIComponent(file.name.replace(/\s/g,'-'))

            if(!isValid){
                return res.status(400).json({
                    message: "file"
                })
            }
            try{
                fs.renameSync(file.path,join(uploadsFolder, fileName))
            }catch (error){
                console.log(error);
            }

            try {
                // stores the fileName in the database
                const newFile = await File.create({
                  name: `files/${fileName}`,
                });
                return res.status(200).json({
                  status: "success",
                  message: "File created successfully!!",
                });
              } catch (error) {
                res.json({
                  error,
                });
              }

        })
        // form.parse(req, function (err, fields, files) {
        //     const oldpath = files.image.path;
        //     const newpath = __dirname + "./public//uploads/" + files.image.name;
        //     const rawData = fs.readFileSync(oldpath)

        //     fs.writeFile(newpath, rawData, function (err) {
        //         if (err) { throw err; }
        //         console.log('file uploaded successfully');
        //         return res.end("file uploaded successfully");
        //     });
        // });
    },
    //     const data = {
    //         image : {
    //         data: fs.readFileSync(path.join('/uploadImage/' + req.files.uploadFiles)),
    //         contentType: ["image/png", "image/jpeg"]
    //     },
    //         judul : req.body.judul,
    //         subJudul : req.body.subJudul,
    //         deskripsi : req.body.deskripsi,
    //     }

    //     const blog = await Blog(data)

    //     try {
    //         blog.create(data)
    //         res.status(200).json({
    //         message : "succes"
    //         })
    //     } catch (error) {
    //         res.status(404).json({
    //         message : "error"
    //         })
    //     }
       
    // },

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

    deleteBlogById: async (req, res, next)=>{
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
    },
    
    postComment: async (req,res) => {
        const data = req.body
        console.log(data);
        const comment = await Comment(data)
        try {
            comment.save(data)
            res.status(200).json({
            message : "succes"
            })
        } catch (error) {
            res.status(404).json({
            message : "error"
            })
        }
    }
}