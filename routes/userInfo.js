var express = require('express');
var router = express.Router();
var allBlogModel = require("../model/allartical");
var userInfoModel = require("../model/userInfo");

router.get('/',(req,res)=>{
	if(req.session.whatever.username){
		console.log('aaa');

		Promise.all([allBlogModel.find({author:req.session.whatever.username},{},{sort:{createTime:-1}}),userInfoModel.find({id:req.session.whatever._id})]).then(result=>{
			console.log(result[1][0]);
			var hasInfo=true;
			if(result[1].length===0){
				console.log('empty');
                 hasInfo=false;
			}
			console.log(hasInfo);
			res.render('userinfo',{
					title:'我的个人中心',
					isNew:hasInfo,
					who:req.session.whatever.username,
					itemList:result[0],
					infoList:result[1][0],
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
							

			})
		})


	}
	else{
		res.redirect('/userlogin');
	}
})

router.post('/reviseInfo',(req,res)=>{
	console.log(req.body);

})
module.exports=router;