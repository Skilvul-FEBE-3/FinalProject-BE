const express = require('express');
const { 
    getAllBlog, 
    getBlogById,
    postBlog,
    updateBlogById,
    deleteBlogById,
    postComment
} = require('../controllers/blog.controller');
const router = express.Router();
const { verifyToken, adminOnly } = require('../middleware/authUser');
const uploadFiles = require('../middleware/uploadImage')

router.get("/",verifyToken,getAllBlog)
router.get("/:id",verifyToken,getBlogById)
router.post("/",verifyToken, adminOnly,postBlog,uploadFiles)
router.patch("/:id",verifyToken, adminOnly,updateBlogById,uploadFiles)
router.delete("/:id",verifyToken, adminOnly,deleteBlogById)
router.post("/comment",verifyToken,adminOnly,postComment)

module.exports = router