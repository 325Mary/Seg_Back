const multer = require('multer')
const uuid = require('uuid')
const path = require('path')

const storage =  multer.diskStorage({
    destination : 'storage/img',
    filename :  (req ,file , cb ) =>{
        cb(null ,  uuid.v4() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
    limits: {
      fileSize: 5000000,
    },
     fileFilter: function (req, file, cb) {
      const filetypes = /png|jpeg|jpg|gif/;
      const mimetype = filetypes.test(file.mimetype)
      const extname = filetypes.test(path.extname(file.originalname))

      if (mimetype && extname){
        return cb(null, true);
      }
      return cb( null , false);
     }
  });

module.exports = upload