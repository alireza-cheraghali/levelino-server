const express=require("express");
const router=express.Router();
const question=require('../middleware/question')
router.post('/defineQuestion',question.defineQuestion)
router.get('/getQuestion',question.getQuestion)
module.exports=router