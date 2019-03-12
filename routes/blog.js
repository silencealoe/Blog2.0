var express = require('express');
var router = express.Router();
var allBlogModel = require("../model/allartical");
var myBlogModel = require("../model/myartical");
var userInfo = require("../model/userInfo");
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
        allBlogModel.create({
        	authorId:req.session.whatever._id,
        	author:req.session.whatever.username,
        	title:req.body.title,
        	content:req.body.content,
        	createTime:new Date(),
        	imgPath:imgArray,
        	like:0,
        	collect:0,
        	read:0,
        	readId:[],
        	likeId:[],
        	collectionId:[],
        	comment:[]
        }).then(result=>{
        	console.log('1233333');
        	res.render('blog',{title:'创建博客',user:req.session.whatever.username,isNew:true,isSuccess:true})
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