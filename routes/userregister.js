var express = require('express');
var router = express.Router();
var userModel = require('../model/user');
var userInfo = require('../model/userInfo')
var myCollect = require('../model/mycollection');

router.get('/',(req,res)=>{
	res.render('userregister',{title:"注册",isSuccess:false})
})

router.post('/validate',(req,res)=>{

	userModel.create({
		username:req.body.username,
		password:req.body.password,
		email:req.body.email
	}).then(result=>{
		console.log('register',result);
		myCollect.create({
			userId:result._id,
			artical:[]
		}).then(resu=>{
			userInfo.create({
				id:result._id,
				nickname:'',
				age:0,
				addr:'',
				mark:'',
				gender:'',
				headPath:'',
				stylePath:'',
				focus:[],
				collect:[]
			}).then(s=>{

		     res.render('userregister',{title:"注册",isSuccess:true});
			})
  
		})
	})
})


router.get('/check',(req,res)=>{
	userModel.find({
		email:req.query.email
	}).then(result=>{
		if(result.length===0){
			res.send({ok:true})
		}else{
			res.send({ok:false})
		}
	})
})
module.exports = router;