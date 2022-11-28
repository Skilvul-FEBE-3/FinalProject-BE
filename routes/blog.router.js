const express = require('express');
const { 
    getAllBlog, 
    getBlogById,
    postBlog,
    updateBlogById,
    deleteBlogById,
    postComment,
    getAllBlogCommentById,
    deleteBlogCommentById
} = require('../controllers/blog.controller');
const router = express.Router();
const { verifyToken, adminOnly } = require('../middleware/authUser');
// const uploadFiles = require('../uploadImage')

router.get("/", verifyToken, getAllBlog)
router.get("/:id", verifyToken, getBlogById)
router.post("/", verifyToken, adminOnly, postBlog)
router.patch("/:id", verifyToken, adminOnly, updateBlogById)
router.delete("/:id", verifyToken, adminOnly, deleteBlogById)
router.post("/:id/comment", verifyToken, postComment)
router.get("/:id/comment", verifyToken, getAllBlogCommentById)
router.delete("/:id/comment/:idComment", verifyToken, deleteBlogCommentById)


module.exports = router