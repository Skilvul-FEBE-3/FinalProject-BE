const Video = require("../models/video");

module.exports = {
  getAllVideo: async (req, res) => {
    try {
      const video = await Video.find({});
      res.json(video);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getVideoById: async (req, res) => {
    try {
      const { id } = req.params;
      const video = await Video.findById(id);

      res.status(200).json({
        message: "Sukses mendapatkan data video",
        data: video,
      });
    } catch (error) {
      console.log(error);
    }
  },

  addVideo: (req, res) => {
    const data = req.body;
    const video = new Video(data);

    video.save();

    res.status(200).json({
      message: "Video baru berhasil ditambahkan!",
    });
  },

  updateVideoById: async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const video = await Video.findByIdAndUpdate(id, data);

    await video.save();

    res.status(200).json({
      message: "Data berhasil diupdate!",
    });

    video.save();
  },

  deleteVideoById: async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);

    await video.remove();

    res.json({
      message: "Data yang dipilih berhasil dihapus!",
      data: "terhapus",
    });
  },

  addComment: async (req, res) => {
    const { id } = req.params;
    const { commentContent, postedBy } = req.body;

    if (!commentContent) {
      res.status(400).json({
        message: "Comment harus diisi",
      });
      return;
    }

    const video = await Video.findByIdAndUpdate(id, {
      $push: {
        comment: {
          commentContent,
          postedBy,
        },
      },
    });

    await video.save();

    res.status(200).json({
      message: "Data berhasil diupdate!",
    });

    video.save();
  },

  getAllCommentByVideo: async (req, res) => {
    try {
      const { id } = req.params;
      const video = await Video.findById(
        id,
        "-_id -link -judul -deskripsi -tanggalUpload"
      );

      res.status(200).json({
        message: "Sukses mendapatkan data video",
        data: video,
      });
    } catch (error) {
      console.log(error);
    }
  },

  deleteComment: async (req, res) => {
    const { id } = req.params;
    // const { commentContent, postedBy } = req.body;

    const video = await Video.findByIdAndUpdate(id, {
      $pull: {
        comment: { _id: req.params.commentID },
      },
    });

    await video.save();

    res.status(200).json({
      message: "Data berhasil diupdate!",
    });
  },
};
