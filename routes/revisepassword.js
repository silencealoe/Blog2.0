var express = require('express');
var router = express.Router();
var userModel = require('../model/user');

router.get('/',(req,res)=>{
	res.render('revisepassword',{title:'修改密码',user:req.session.whatever.username,who:req.session.whatever._id})
})
router.post('/',(req,res)=>{
	console.log('revise',req.body);
	userModel.update({_id:req.body.id},{$set:{
		password:req.body.password

	}}).then(result=>{
		res.send({
			ok:true
		})
	})

})
module.exports=router;