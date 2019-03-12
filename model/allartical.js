var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var obj = {
	authorId:String,
	author:String,
	title:String,
	content:String,
	createTime:Date,
	like:Number,
	imgPath:Array,
	collect:Number,
	likeId:Array,
	collectionId:Array,
	read:Number,
	readId:Array,
	comment:Array
}

var blogModel = mongoose.model("allartical",new Schema(obj));

module.exports = blogModel;