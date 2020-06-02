const express=require("express");
const router=express.Router();
const changePassword=require('../middleware/ChangePassword')
router.put('/:email',changePassword.ChangePasswordWithoutLogin)
module.exports=router