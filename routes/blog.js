var express = require('express');
var router = express.Router();
var allBlogModel = require("../model/allartical");
var myBlogModel = require("../model/myartical");
var multer = require('multer');
var upload = multer({dest:'public/upload'});

router.get('/',(req,res)=>{
	if(req.session.whatever){
		res.render('blog',{title:'创建博客',user:req.session.whatever.username,isNew:true,isSuccess:false})
	}else{
		res.redirect("/userlogin")
	}
})

router.post('/',upload.array('myfile'),(req,res)=>{
	console.log(req.body);
	var imgArray = req.files.map(item=>'/upload/'+item.filename);
	myBlogModel.create({
		author:req.session.whatever.username,
		title:req.body.title,
		content:req.body.content,
		createTime:new Date(),
		imgPath:imgArray,
		like:0
	}).then(result=>{
        allBlogModel.create({
        	author:req.session.whatever.username,
        	title:req.body.title,
        	content:req.body.content,
        	createTime:new Date(),
        	like:0,
        	imgPath:imgArray
        }).then(result=>{
        	res.render('blog',{title:'创建博客',user:req.session.whatever.username,isNew:true,isSuccess:true})
        })
	})

})

router.get('/update',(req,res)=>{
	allBlogModel.findById(req.query.id).then(result=>{
		console.log(result);
		res.render("blog",{
			title:'修改博客',
			user:req.session.whatever.username,
			isSuccess:false,
			update:result,
			isNew:false
		})
	})
})

router.post('/update',upload.array('myfile'),(req,res)=>{
	console.log('aaa---');
	console.log(req.files);
	console.log(req.body);
	if(req.files.length){
		var imgArray = req.files.map(item=>'/upload/'+item.filename);
		allBlogModel.findByIdAndUpdate(req.body.id,{$set:{
			title:req.body.title,
			content:req.body.content,
			imgPath:imgArray
		}}).then(result=>{
             res.render("blog",{
             	isNew:false,
             	title:'修改游记',
             	user:req.session.whatever.username,
             	isSuccess:true,
             	update:result
             })

		})
	}
})
router.get('/delete',(req,res)=>{
	console.log(req.query);
	allBlogModel.findByIdAndRemove(req.query.id).then(result=>{
		console.log('--------');
		console.log(result);
		res.send({
			ok:1
		})
	})

})
module.exports = router;