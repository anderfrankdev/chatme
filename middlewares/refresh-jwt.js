const jwt = require("jsonwebtoken")
const User = require('../models/user');
const generateJWT = require("../helpers/generate-jwt");
var http = require('http');


const refreshJwt = async (req,res,next)=>{
	//console.log(req.session)
	const token = req.session.token

	if (!token||token==undefined) {
		req.redirect = true
		return next()
	}
	
	try{
		
		req.token = token

		const {type} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
		
		if (type!="session") {
			req.redirect = true
			return next()
		}
		
		return next()
	
	}catch(err){

		if (err.name.includes("TokenExpiredError")) {
			
			const oldtoken = req.session.token

			const {uid,type} = jwt.decode(oldtoken, process.env.SECRETORPRIVATEKEY)
			
			if (type!="session") {
				req.redirect = true
				return next()
			}
			
			const token = await generateJWT( uid )
			
			//res.cookie('token', token, { httpOnly: true})
			req.session.token = token
			req.token = token
			
			return next()

		}

		//req.redirect = true
		return next()
	}
}

module.exports=refreshJwt