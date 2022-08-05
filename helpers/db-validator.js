const User = require('../models/user')

const validateUserId = async (id) => {
		const existId = await User.findById(id)
		if( !existId )
			throw new Error("The user doesn't exist")
}

const allowedCollections = (collection="",collections=[]) =>{

	const included = collections.includes(collection);

	if (!included){
		throw new Error(`The collection ${collection} in not allowed`)
	}

	return true
}

module.exports = {
	validateUserId,
	allowedCollections
}