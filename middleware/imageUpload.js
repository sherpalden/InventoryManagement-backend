const multer = require('multer');
const path = require('path');

const imageFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
      cb(null, true)
    } 
    else {
      console.log('please upload only images');
      cb("Please upload only images.", false);
    }
}

//store in disk...
let images = [];
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads')
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.split('.')[0] + '-' + Date.now() + path.extname(file.originalname);
    images.push(fileName);
    req.images = images;
    cb(null, fileName);
  }
});

//store in gridFS database...
const crypto = require('crypto'); 
const mongoose = require("mongoose");
const GridFsStorage = require("multer-gridfs-storage");
const mongoURI = "mongodb://localhost:27017/mean-app";

const gridStorage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        else{
          const filename = buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: "uploads"
          };
          resolve(fileInfo);
        }
      });
    });
  }
});

const uploadDisk = multer({
    storage: diskStorage,
    limits:{fileSize: 100000000},
    fileFilter: imageFilter
});

const uploadGrid = multer({
    storage: gridStorage,
    limits:{fileSize: 1000000},
    fileFilter: imageFilter
});

module.exports = {
  uploadDisk,
  uploadGrid
}
