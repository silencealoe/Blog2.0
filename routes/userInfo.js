var express = require('express');
var router = express.Router();
var allBlogModel = require("../model/allartical");
var userInfoModel = require("../model/userInfo");

router.get('/',(req,res)=>{
	if(req.session.whatever.username){
		console.log('aaa');

			
		Promise.all([allBlogModel.find({author:req.session.whatever.username},{},{sort:{createTime:-1}}),userInfoModel.find({id:req.session.whatever._id})]).then(result=>{
			console.log(result[1][0]);
			var hasInfo=false;
			if(result[1].length===0){
				console.log('empty');
                 hasInfo=true;
			}

            var focus=[];
            var collect=[];
            collect=result[1][0].collect;
            focus=result[1][0].focus;
			
			function focusArray(focus){
				var newArray=[];
				focus.map(item=>{
					console.log('item',item);
					newArray.push(userInfoModel.find({id:item}));
				})
				return newArray;
			}
			function collectArray(collect){
				var newArray=[];
				collect.map(item=>{
					console.log('12121',item);
					newArray.push(allBlogModel.find({_id:item}));
				})
				return newArray;
			}
			var arrayfocus=focusArray(focus);
			var arraycollect=collectArray(collect);
			Promise.all(arrayfocus).then(r=>{
				console.log('focus',r);
				Promise.all(arraycollect).then(s=>{
					console.log('collect',s);
						res.render('userinfo',{
								title:'我的个人中心',
								isNew:hasInfo,
								who:req.session.whatever.username,
								itemList:result[0],
								infoList:result[1][0],
								collectlist:s,
								focuslist:r,
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
			})
	
			// result[1][0].collect.map(ite=>{
			//       allBlogModel.find({_(id:ite}).then(rr=>{
			//       	console.log('收藏',rr[0]);
			//       	collectArray.push(rr[0]);
			//         flag2=true;
			//       })
				
			// })
		
			console.log(collectArray);
				
		
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