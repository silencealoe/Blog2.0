var express = require('express');
var router = express.Router();
var userModel = require('../model/user');
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
               
		     res.render('userregister',{title:"注册",isSuccess:true});
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