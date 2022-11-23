const mongoose = require("mongoose");
const { Schema } = mongoose;

const videoSchema = new Schema({
  judul: {
    type: String,
    require: true,
  },
  deskripsi: {
    type: String,
    require: true,
  },
  tanggalUpload: {
    type: Date,
    default: Date.now(),
    require: true,
  },
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
