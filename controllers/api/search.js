const {ObjectId} = require("mongoose").Types
const {response} = require("express")
const User = require("../../models/user")

const collectionsAllowed = [
	"users",
	"username",
	"email"
]

const searchUsers = async(term='',res=response)=>{
	const esMongoID = ObjectId.isValid(term);

	if(esMongoID){
		const user = await User.findById(term)
		res.status(200).json({
			results: (user)? [user]:[]
		})
	}

	const regex = new RegExp(term, 'i')

	const users = await User.find({
		$or:[{first_name:regex}, {email:regex},{username:regex},{last_name:regex}]
	})
	console.log(term)
	res.status(200).json({
		results: users
	})
}

const searchUsername = async(term='',res=response)=>{


	const regex = new RegExp(term, 'i')

	const users = await User.findOne({username:term.toLowerCase()})

	res.status(200).json({
		results: users
	})
}

const searchEmail = async(term='',res=response)=>{


	const regex = new RegExp(term, 'i')

	const users = await User.findOne({email:term.toLowerCase()})

	res.status(200).json({
		results: users
	})
}

/*
const searchCategories = async(term='',res=response)=>{
	const esMongoID = ObjectId.isValid(term);

	if(esMongoID){
		const category = await Category.findById(term).populate("user","name")
		res.status(200).json({
			results: (category) ? [category]:[]
		})
	}

	const regex = new RegExp(term, 'i')

	const categories = await Category.find({
		$or:[{name:regex}],
		$and:[{state:true}]
	}).populate("user","name")

	res.status(200).json({
		results: categories
	})
}*/

/*const searchProducts = async(term='',res=response)=>{
	const esMongoID = ObjectId.isValid(term);

	if(esMongoID){
		const product = await Product.findById(term)
			.populate("user")
			.populate("category")

		res.status(200).json({
			results: (product) ? [product]:[]
		})
	}

	const regex = new RegExp(term, 'i')

	const products = await Product.find({
		$or:[{name:regex}],
		$and:[{state:true}]
	}).populate("user","name").populate("category","name")

	res.status(200).json({
		results: products
	})
}*/

/*const searchProducts = async(term='',res=response)=>{
	const esMongoID = ObjectId.isValid(term);

	if(esMongoID){
		const product = await Product.findById(term)
		res.status(200).json({
			results: (product) ? [product]:[]
		})
	}

	const regex = new RegExp(term, 'i')

	const products = await Product.find({
		$or:[{name:regex}],
		$and:[{state:true}]
	})
	console.log("Product")
	res.status(200).json({
		results: products
	})
}*/

const search = async(req,res)=>{
	const {collection,term} = req.params
	
	if (!collectionsAllowed.includes(collection)) {
		return res.status(400).json({
			msg:`The collections allowed are ${collectionsAllowed}`
		})
	}

	switch(collection){
		case"users":
			return await searchUsers(term,res)
		break
		case"categories":
			return
		break
		case"username":
			return searchUsername(term,res)
		break
		case"email":
			return searchEmail(term,res)
		break
		default:
			res.status(500).json({
				msg:'I forgot to make this search'
			})
	}
}

module.exports={
	search
}