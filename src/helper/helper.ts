export class Helper {

  static customfileName(req,file,cb){
    let filename = ""
    filename = file.originalname
        
    cb(null,filename)
  }
  static customDest(req,file,cb){
   
    cb(null,"/img")
  }


  static validFile(req, file, cb) {
    if (file.mimetype.indexOf("jpg") > -1 || file.mimetype.indexOf("jpeg") > -1 || file.mimetype.indexOf("png") > -1) {
      
      cb(null, true);
    } else {
      cb(null, false);
      req.fileValidationError = "Only image files are allowed"
    }
  }



}