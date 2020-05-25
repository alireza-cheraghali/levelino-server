const mongoose=require('mongoose');
const signupSchema=new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    username:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now()
    },
    profilePicture:{
        type:String
    }
})
module.exports=mongoose.model('Users',signupSchema);