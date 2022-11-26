const multer = require("multer");
const util = require('util');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploadImage')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
}
});

var upload = multer({ storage: storage }).single("image");
var uploadFiles = util.promisify(upload);
module.exports = uploadFiles;