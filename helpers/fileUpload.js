const path = require("path");
const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets");
  },
  filename: function (req, file, cb) {
    console.log(file);
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});
// console.log(storage.getFilename());
const upload = multer({ storage: storage });

function serveStaticFiles(router) {
  router.use("/assets", express.static(path.join(__dirname, "../assets")));
}

module.exports = { upload, serveStaticFiles };