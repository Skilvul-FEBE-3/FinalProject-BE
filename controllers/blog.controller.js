const Blog = require("../models/blogs");
const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
// const fileUpload = require("express-fileupload");
// const uploadFiles = require('../uploadImage')

module.exports= {

    getAllBlog: async (req, res)=>{
            const blog = await Blog.find()
            try {
                res.status(200).json(blog)
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


    // // formidable
    // postBlog: async (req, res, next)=>{
    //     // membuat objek form dari formidable untuk mengambil data dari form
    //     const data={
    //         form :new formidable.IncomingForm(),
    //         title : req.body.title,
    //         subTitle : req.body.subTitle,
    //         description : req.body.description,
    //         createdBy : req.body.createdBy
    //     }
    //     console.log(data);
    //     const uploadsFolder = path.join(__dirname+'./public/imageBlog')
       
    //     data.form.uploadDir = uploadsFolder

    //     data.form.parse(req, async (err, fields, files)=>{

    //         if(err){
    //             console.log("error parsing files");
    //             return res.satus(400).json({
    //                 message: "error parsing files"
    //             })
    //         }

    //         const file = files.file
    //         const isFileValid = (file) => {
    //             const type = file.type.split("/").pop();
    //             const validTypes = ["jpg", "jpeg", "png", "pdf"];
    //             if (validTypes.indexOf(type) === -1) {
    //               return false;
    //             }
    //             return true;
    //           };
    //         const isValid =isFileValid(file)

    //         const fileName = encodeURIComponent(file.name.replace(/\s/g,'-'))

    //         if(!isValid){
    //             return res.status(400).json({
    //                 message: "file"
    //             })
    //         }
    //         try{
    //             fs.renameSync(file.path,join(uploadsFolder, fileName))
    //         }catch (error){
    //             console.log(error);
    //         }

    //         try {
    //             // stores the fileName in the database
    //             const newFile = await File.create({
    //               name: `files/${fileName}`,
    //             });
    //             return res.status(200).json({
    //               status: "success",
    //               message: "File created successfully!!",
    //             });
    //           } catch (error) {
    //             res.json({
    //               error,
    //             });
    //           }

    //     })
    //     // form.parse(req, function (err, fields, files) {
    //     //     const oldpath = files.image.path;
    //     //     const newpath = __dirname + "./public//uploads/" + files.image.name;
    //     //     const rawData = fs.readFileSync(oldpath)

    //     //     fs.writeFile(newpath, rawData, function (err) {
    //     //         if (err) { throw err; }
    //     //         console.log('file uploaded successfully');
    //     //         return res.end("file uploaded successfully");
    //     //     });
    //     // });
    // },
    // //     const data = {
    // //         image : {
    // //         data: fs.readFileSync(path.join('/uploadImage/' + req.files.uploadFiles)),
    // //         contentType: ["image/png", "image/jpeg"]
    // //     },
    // //         judul : req.body.judul,
    // //         subJudul : req.body.subJudul,
    // //         deskripsi : req.body.deskripsi,
    // //     }

    // //     const blog = await Blog(data)

    // //     try {
    // //         blog.create(data)
    // //         res.status(200).json({
    // //         message : "succes"
    // //         })
    // //     } catch (error) {
    // //         res.status(404).json({
    // //         message : "error"
    // //         })
    // //     }
       
    // // },

    // filesatck
    postBlog: async (req, res)=>{
        const data = req.body
        const blog = await Blog(data);

        try {
            saveBlog=  await Blog.create(blog)
            res.status(200).json(saveBlog)
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
        const { id } = req.params
        const data = req.body
        console.log(data);
        if (!data) {
            res.status(400).json({
              message: "Comment harus diisi",
            });
            return;
          }

          try {
            const blog = await Blog.findByIdAndUpdate(id,{
                $push: { 
                    comment: data,
                },
            });
            await blog.save();
            res.status(200).json({
                message : "success",
                })
          } catch (error) {
            res.status(404).json({
                message : "error"
                })
          } 
    },
    getAllBlogCommentById : async (req, res) => {
        const {id} = req.params;
        const blog = await Blog.findById(id, "-image -title -subTitle -description -dateCreated -createdBy")
        console.log(blog);
            try {
                res.status(200).json(blog)
            } catch (error) {
                res.status(500).json({
                    message :"error"
                  })
            }
    },

    updateCommentById: async (req, res)=>{
        const {idComment} = req.params
        const data = req.body
        try {
            const upComment = await Blog.findoneAndUpdate(idComment ,{
                $push: {
                  comment: data,
                },
              });
              await upComment.save()

            //   const blog = await Blog.findByIdAndUpdate(id, {
            //     $push: {
            //       comment: upComment,
            //     },
            //   });
            //   await blog.save();
              
              res.status(200).json({
                message: "success"
            })
        } catch (error) {
            res.status(404).json({
            message: "error"
        })
        }
    },

    deleteBlogCommentById : async (req, res) => {
        const {id,idComment} = req.params
        try {
            const blog = await Blog.findByIdAndUpdate(id, {
                $pull: {
                  comment:{_id: idComment},
                },
              });
              await blog.save()
              res.status(200).json({
                message: "success"
            })
        } catch (error) {
            res.status(404).json({
            message: "error"
        })
        }
    }
}
