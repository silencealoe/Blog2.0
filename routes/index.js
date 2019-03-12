var express = require('express');
var router = express.Router();
var allBlogModel = require("../model/allartical");
var myBlogModel = require('../model/myartical');
var userInfo = require('../model/userInfo');
var myCollect = require('../model/mycollection')
/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('session',req.session.whatever);
	if(req.session.whatever){
		Promise.all([allBlogModel.find({},{imgPath:0},{sort:{like:-1}}),userInfo.find({id:req.session.whatever._id})]).then(result=>{
			console.log('headPath',result[1][0].headPath);
			res.render('index',{
	  				title: '首页',
	  				isNew:true,
	  				user:req.session.whatever.username,
	  				itemList:result[0],
	  				userinfo:result[1][0],
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
	console.log('232323');
	allBlogModel.find({_id:req.body.id}).then(result=>{
		console.log('RES',result);
         console.log(result[0].likeId);
         var u_id=result[0].likeId.indexOf(req.body.userId);
         console.log(u_id);
         if(u_id === -1){
         	result[0].likeId.push(req.body.userId);
         	var array=result[0].likeId;
         	console.log(array);
         	console.log(result[0].likeId);

         	var likes =parseInt(req.body.nums)+1;
         	console.log('like',result[0].like);
         	myBlogModel.findByIdAndUpdate(req.body.id,{$set:{like:likes,likeId:array}}).then(result=>{
         		allBlogModel.findByIdAndUpdate(req.body.id,{$set:{like:likes,likeId:array}}).then(resu=>{
         			console.log('hahah',resu);
         			res.json({
         				ok:1
         			})
         		})
         	})

         }else{
         	console.log('asd');
         	res.json({
         		ok:0
         	})
         }

	})
	
})
router.post('/addcollect',(req,res)=>{
	console.log(req.body);
	myCollect.find({userId:req.body.userId}).then(result=>{
		console.log('collect',result);
		var hasIt=result[0].artical.indexOf(req.body.id);
		if(hasIt===-1){
			result[0].artical.push(req.body.id);
			myCollect.update({userId:req.body.userId},{$set:{
				artical:result[0].artical
			}}).then(reu=>{
				allBlogModel.find({_id:req.body.id}).then(re=>{
					console.log('collectall',re);
					var has=re[0].collectionId.indexOf(req.body.userId);
					if(has===-1){
						re[0].collectionId.push(req.body.userId);
						var collect=parseInt(req.body.nums)+1;
						allBlogModel.findByIdAndUpdate(req.body.id,{$set:{
							collect:collect,
							collectionId:re[0].collectionId
						}}).then(r=>{
							userInfo.find({id:req.session.whatever._id}).then(rss=>{
								console.log('rsssss',rss[0]);
								var index=rss[0].collect.indexOf(req.body.id);
								if(index===-1){
									rss[0].collect.push(req.body.id);
								}
								userInfo.update({id:req.session.whatever._id},{$set:{
									collect:rss[0].collect
								}}).then(rqs=>{
									res.send({
										ok:1
									})
								})
							})
							
						})

					}
				})

			})
		}else{
            res.send({
            	ok:0
            })
		}
	})

})

module.exports = router;
