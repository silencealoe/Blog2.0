var express = require('express');
var router = express.Router();
var allBlogModel = require("../model/allartical");
var myBlogModel = require('../model/myartical');

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session.whatever){
    	allBlogModel.find({

    	},{imgPath:0},{sort:{like:-1}}).then(result=>{
    		console.log(result);
  			res.render('index', { 
  				title: '首页',
  				isNew:true,
  				user:req.session.whatever.username,
  				itemList:result,
  				handleDate:function(date){   
  					var year=date.getFullYear();
		          	var month=date.getMonth();
		          	var day=date.getDate();
		          	var hour=date.getHours();
		          	var minutes=date.getMinutes();  	
		          	month=month<10?('0'+(month+1)):month+1;
		          	day=day<10?('0'+day):day;
		          	hour=hour<10?('0'+hour):hour;
		          	minutes=minutes<10?('0'+minutes):minutes;
		  			return year+'-'+(month)+'-'+day+' '+hour+':'+minutes;

  				}
  			});
    	})
	}else{
		res.redirect("/userlogin");
	}
});


router.get('/logout',(req,res)=>{
	req.session.destroy((error)=>{
		if(!error){
			res.redirect('/userlogin');
		}
	})
})

router.post('/addlike',(req,res)=>{
	myBlogModel.findByIdAndUpdate(req.body.id,{$set:{like:req.body.like}}).then(result=>{
		allBlogModel.findByIdAndUpdate(req.body.id,{$set:{like:req.body.like}}).then(result=>{
			console.log(result);
			res.send({
				ok:1
			})
		})
	})
})

module.exports = router;
