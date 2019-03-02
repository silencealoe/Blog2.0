var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var obj = {
	userId:String,
	artical:Array
}
var blogModel = mongoose.model("mycollect",new Schema(obj));

module.exports = blogModel;