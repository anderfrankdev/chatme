const {Schema,model} = require("mongoose");

const UserSchema = Schema({
	name:{
		type:String,
		required:[true,"The name is obligatory"]
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
	}
});

UserSchema.methods.toJSON = function() {
	const {__v,google, _id, password,...user} = this.toObject()
	user.uid = _id
	return user;
};

module.exports = model("User",UserSchema);