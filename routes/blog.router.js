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
// const uploadFiles = require('../uploadImage')

router.get("/", verifyToken, getAllBlog)
router.get("/:id", verifyToken, getBlogById)
router.post("/", verifyToken, adminOnly, postBlog)
router.patch("/:id", verifyToken, adminOnly, updateBlogById)
router.delete("/:id", verifyToken, adminOnly, deleteBlogById)
router.post("/comment", verifyToken, postComment)

module.exports = router