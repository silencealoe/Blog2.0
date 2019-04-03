var express = require('express');
var router = express.Router();
var allBlogModel = require("../model/allartical");
var userInfo = require("../model/userInfo");

router.get('/',(req,res)=>{
	console.log('taaaaa',req.query);
	Promise.all([allBlogModel.find({authorId:req.query.id}),userInfo.find({id:req.query.id})]).then(result=>{
	 console.log('sss',result[0]);
	 var hisArtical=result[0];
	 var hisInfo=result[1][0];
	 var focuslist=[...hisInfo.focus];	
	 var collectlist=[...hisInfo.collect];
	 res.render('otherInfo',{
	 	who:req.session.whatever._id,
	 	title:req.query.who+'的个人信息',
	 	hisInfo:hisInfo,
	 	hisArtical:hisArtical,
	 	focuslist:focuslist,
	 	collectlist:collectlist


	 });

	})

})
module.exports=router;