const express = require("express");
const router = express.Router();

const {
  getAllVideo,
  getVideoById,
  addVideo,
  updateVideoById,
  deleteVideoById,
} = require("../controllers/video.controller");
const { verifyToken, adminOnly } = require("../middleware/authUser");

router.get("/", verifyToken, getAllVideo);
router.get("/:id", verifyToken, getVideoById);
router.post("/", verifyToken, adminOnly, addVideo);
router.patch("/:id", verifyToken, adminOnly, updateVideoById);
router.delete("/:id", verifyToken, adminOnly, deleteVideoById);

module.exports = router;
