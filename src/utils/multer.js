const multer = require("multer");
const path = require("path");
const { randomBytes } = require("crypto");

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "uploads"),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "uploads"));
    },
    filename: (req, file, cb) => {
      randomBytes(6, (error, hash) => {
        if (error) {
          cb(error, file.filename);
        }
        file.filename = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, file.filename);
      });
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("invalid file type. "));
    }
  },
};
