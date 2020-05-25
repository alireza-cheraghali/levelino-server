const multer=require('multer');
const path=require('path');
const moment=require('moment');
const Date=moment().format('YYYY-MM-DD,h_mm_ss')
const storage=multer.diskStorage({
    destination:'./static/profilepicture',
    filename(req,file,cb){
        cb(null,file.fieldname+'-'+Date+path.extname(file.originalname))
    }
})
const upload=multer({
    storage:storage
}).single('profilePicture')
module.exports=upload