var express = require('express');
var router = express.Router();
var userInfoModel = require('../model/userInfo');
var multer = require('multer');
var userImg = multer({dest:'public/userImg'});

router.post('/',userImg.single('file'),(req,res)=>{
	 console.log(req.file);
     console.log(req.session.whatever._id);
	 console.log(req.body);
	 userInfoModel.create({
	 	id:req.session.whatever._id,
	 	nickname:req.body.nickname,
	 	age:req.body.age,
	 	mark:req.body.mark,
	 	addr:req.body.addr,
	 	gender:req.body.gender,
	 	headPath:'/userImg/'+req.file.filename
	 }).then(result=>{
	 	res.send({
	 		ok:1
	 	})
	 })
})
router.post('/update',userImg.single('file'),(req,res)=>{
	console.log(req.file);
	console.log(req.body);
	userInfoModel.update({id:req.session.whatever._id},{$set:{
		nickname:req.body.nickname,
		age:req.body.age,
		mark:req.body.mark,
		addr:req.body.addr,
		gender:req.body.gender,
		headPath:'/userImg/'+req.file.filename
	}}).then(result=>{
		res.send({
			ok:1
		})
	});
})
module.exports=router;