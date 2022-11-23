const express = require('express');
const { 
    getAllBlog, 
    getBlogById,
    postBlog,
    updateBlogById,
    deleteBlogById
} = require('../controllers/blog.controller');
const router = express.Router();
const { verifyToken, adminOnly } = require('../middleware/authUser');

router.get("/",verifyToken,getAllBlog)
router.get("/:id",verifyToken,getBlogById)
router.post("/",verifyToken, adminOnly,postBlog)
router.patch("/:id",verifyToken, adminOnly,updateBlogById)
router.delete("/:id",verifyToken, adminOnly,deleteBlogById)

module.exports = router