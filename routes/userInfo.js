var express = require('express');
var router = express.Router();
var allBlogModel = require("../model/allartical");
var userInfoModel = require("../model/userInfo");

router.get('/',(req,res)=>{
	if(req.session.whatever.username){
		console.log('aaa');

			var focusArray=[];
			var collectArray=[];
			var flag1=false;
			var flag2=false;
		Promise.all([allBlogModel.find({author:req.session.whatever.username},{},{sort:{createTime:-1}}),userInfoModel.find({id:req.session.whatever._id})]).then(result=>{
			console.log(result[1][0]);
			var hasInfo=true;
			if(result[1].length===0){
				console.log('empty');
                 hasInfo=false;
			}
			result[1][0].focus.map(item=>{
				console.log('item',item);
				userInfoModel.find({id:item}).then(resu=>{
					console.log('关注',resu[0]);
					focusArray.push(resu[0])
					flag1=true;
				})
			})
			result[1][0].collect.map(ite=>{
			      allBlogModel.find({_id:ite}).then(rr=>{
			      	console.log('收藏',rr[0]);
			      	collectArray.push(rr[0]);
			        flag2=true;
			      })
				
			})
			// if(flag1&&flag2){
			setTimeout(function(){
			console.log('focus-----------------',focusArray);
			console.log(collectArray);
					res.render('userinfo',{
							title:'我的个人中心',
							isNew:hasInfo,
							who:req.session.whatever.username,
							itemList:result[0],
							infoList:result[1][0],
							collectlist:focusArray,
							focuslist:collectArray,
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

			},0)
			
			// }
			// console.log(hasInfo);
		
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