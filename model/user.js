var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var obj = {
	username:String,
	password:String,
	email:String
}
var userModel = mongoose.model("user",new Schema(obj));
module.exports = userModel;