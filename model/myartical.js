var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var obj = {
	author:String,
	title:String,
	content:String,
	createTime:Date,
	like:Number,
	imgPath:Array
}

var blogModel = mongoose.model("myartical",new Schema(obj));

module.exports = blogModel;