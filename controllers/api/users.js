const {response} = require("express");
const User = require('../models/user');
const bcrypt = require("bcryptjs");

const getUsers = async ( req, res = response)=>{
		
	const limit = req.query.limit || 5
	const from = req.query.from || 0
	
	const [total,users] = await Promise.all([
		User.countDocuments(query),
		User.find(query)
		.skip(Number(from))
		.limit(Number(limit))
	])

	res.json({
		total,
		users
	})

}

const postUsers = async ( req, res = response)=>{
	
	const {name,email,password} = req.body;
	
	const user = new User({name,email,password});	

	const existEmail = await User.findOne({email});
	
	
	if (existEmail) {
		return res.status(400).json({
			msg:"The email alrady exist"
		})
	}


 	const salt = bcrypt.genSaltSync();
 	 	
 	user.password = bcrypt.hashSync(String(password),salt);
	
	await user.save();

	res.json(user);
}

const putUsers = async ( req, res = response )=>{
	
	const id = req.params.id;
	const {password, google, ...rest} = req.body;

	if (password){

 		const salt = bcrypt.genSaltSync();
 	 	
 	 	rest.password = bcrypt.hashSync(password,salt);
 	}

 	const user = await User.findByIdAndUpdate( id, rest);

	res.json(
		user
	)
}

const deleteUsers = async ( req, res = response)=>{
	
	const id = req.params.id;

	const user = await User.findByIdAndDelete(id)


	const userAthenticated = req.user

	if (user.state) res.json({user, userAthenticated})

	else res.json({
			"info":"User does not exist"
		}) 
}

module.exports = {
	getUsers,
	postUsers,
	putUsers,
	deleteUsers
}