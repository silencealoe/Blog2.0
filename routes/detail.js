var express = require('express');
var router = express.Router();
var allBlogModel = require("../model/allartical");
var myBlogModel = require("../model/myartical");
var userInfo = require("../model/userInfo");
router.get('/',(req,res)=>{
	if(req.session.whatever){
		console.log(req.query);

	    allBlogModel.find({_id:req.query.id}).then(result=>{
        	console.log(result);
      
            var u_id=result[0].readId.indexOf(req.query.userid);
            if(u_id===-1){
            	result[0].readId.push(req.query.userid);
            	var array=result[0].readId;
            	console.log('de-array',array);
                var reads=parseInt(result[0].read)+1;
                console.log('reads',reads);
                allBlogModel.findByIdAndUpdate(req.query.id,{$set:{read:reads,readId:array}}).then(resu=>{
                	console.log('updateread',resu);
                })
            }
        	var final = result[0];
        	console.log(final)
        	var isAuthor = false;
        	console.log(final.author);
        	if(final.author===req.session.whatever.username){
        		isAuthor = true;
        	}
        	console.log(isAuthor);
             var aboutAuthor={};
            userInfo.find({id:req.session.whatever._id}).then(rss=>{
                console.log('rdss',rss);
                var isFocus=false;
                var index=rss[0].focus.indexOf(result[0].authorId);
                if(index===-1){
                    isFocus=false;

                }else{
                    isFocus=true;
                }
                userInfo.find({id:result[0].authorId}).then(ru=>{
                var  aboutAuthor=ru[0];
                console.log('aaaaa',aboutAuthor);
                            res.render('detail',{
                                title:'游记详情',
                                who:req.session.whatever.username,
                                isAuthor:isAuthor,
                                isNew:false,
                                itemList:final,
                                aboutAuthor:aboutAuthor,
                                isFocus:isFocus
                            });

                })
            })
       
		
        })

	}else{
		res.redirect('/userlogin');
	}
})
router.get('/focus',(req,res)=>{
    console.log(req.query);
    userInfo.find({id:req.session.whatever._id}).then(re=>{
        console.log('111111111',re);
        var index=re[0].focus.indexOf(req.query.id);
        if(index===-1){
             re[0].focus.push(req.query.id);
             userInfo.update({id:req.session.whatever._id},{$set:{
                focus:re[0].focus
             }}).then(result=>{
                  res.send({
                    ok:1
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