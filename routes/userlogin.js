var express = require('express');
var router = express.Router();
var userModel = require('../model/user');
var userInfo = require('../model/userInfo');

router.get('/',(req,res)=>{
	res.render('userlogin',{title:'userlogin',isShow:false,create:'',isNew:true})
})
router.post('/validate',(req,res)=>{

	userModel.find({
		email:req.body.email,
		password:req.body.password
	}).then(result=>{
		if(result.length === 0){
			res.render('userlogin',{title:'userlogin',isShow:true,isNew:true})
		}
		else{
			req.session.whatever = result[0];
			console.log(req.session.whatever);
			// userInfo.create({
				// id:req.session.whatever._id,
				// nickname:req.session.whatever.username
			// }).then(result=>{
                // console.log('info',result);
			   res.redirect('/');
			// })
		}
	})
})
module.exports = router;