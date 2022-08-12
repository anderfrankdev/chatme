const {Schema,model} = require("mongoose");

const UserSchema = Schema({
	first_name:{
		type:String,
		required:false
	},
	last_name:{
		type:String,
		required:false
	},
	username:{
		type:String,
		required:[true,"The username is obligatory"],
		unique:true
	},
	password:{
		type:String,
		required:[true,"The password is obligatory"]
	},
	img:{
		type:String,
		required:false
	},
	email:{
		type:String,
		required:[true,"The email is obligatory"],
		unique:true
	},
	google:{
		type:Boolean,
		default:false
	},
	chats:{
		type:Array,
		required:false
	},
	starred_messages:{
		type:Array,
		required:false
	},
	info:{
		type:String,
		required:false
	}
});

UserSchema.methods.toJSON = function() {
	const {__v,google, _id, password,...user} = this.toObject()
	user.uid = _id
	return user;
};

module.exports = model("User",UserSchema);