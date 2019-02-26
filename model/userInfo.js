var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var obj = {
	id:String,
	nickname:String,
	age:Number,
	addr:String,
	mark:String,
	gender:String,
	headPath:String
}

var blogModel = mongoose.model("userInformation",new Schema(obj));

module.exports = blogModel;