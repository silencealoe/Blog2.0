var express = require('express');
var router = express.Router();
var allBlogModel = require("../model/allartical");
var myBlogModel = require("../model/myartical");


router.get('/',(req,res)=>{
	if(req.session.whatever.username){
		console.log(req.query);
		Promise.all([myBlogModel.find({_id:req.query.id}),allBlogModel.find({_id:req.query.id})]).then(result=>{
        	console.log(result);
        	var final = result[0][0]? result[0][0]: result[1][0];
        	console.log(final)
        	var isAuthor = false;
        	console.log(final.author);
        	if(final.author===req.session.whatever.username){
        		isAuthor = true;
        	}
        	console.log(isAuthor);
			res.render('detail',{
				title:'游记详情',
				who:req.session.whatever.username,
				isAuthor:isAuthor,
				isNew:false,
				itemList:final
			});
        })

	}else{
		res.redirect('/userlogin');
	}
})

module.exports = router;