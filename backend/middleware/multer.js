const multer = require("multer");

const storage = multer.memoryStorage();

 const singleUploads = multer({storage}).single("file")

 module.exports = {
    singleUploads
}