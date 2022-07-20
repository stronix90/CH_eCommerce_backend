const multer = require("multer");
var path = require("path");

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "uploads");
    },
    filename(req, file, cb) {
        cb(
            null,
            new Date().toLocaleDateString().replaceAll("/", ".") +
                "_avatar" +
                path.extname(file.originalname)
        );
    },
});
const upload = multer({ storage });

module.exports = upload;
