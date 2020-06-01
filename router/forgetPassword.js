const express=require("express")
const router=express.Router()
const ForgetPassword=require("../middleware/ForgetPassword")
router.put('/deleteExpireCode',ForgetPassword.DeleteActiveCodeHasExpired)
router.post('/checkActiveCode',ForgetPassword.CheckActiveCode)
router.post('/forgetPasswordWithoutLogin',ForgetPassword.ForgetPasswordWithoutLogin)
module.exports=router