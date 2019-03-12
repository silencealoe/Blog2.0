var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var obj = {
	id:String,
	nickname:String,
	age:Number,
	addr:String,
	mark:String,
	gender:String,
	headPath:String,
	stylePath:String,
	focus:Array,
	collect:Array
}

var blogModel = mongoose.model("userInformation",new Schema(obj));

module.exports = blogModel;