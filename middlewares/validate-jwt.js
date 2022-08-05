const jwt = require("jsonwebtoken")
const User = require('../models/user');
const generateJWT = require("../helpers/generate-jwt");

const validateJwt = async (req,res,next)=>{
	
	const token = req.signedCookies.token


	try{
		if(!token){
			return res.status(401).json({
				msg:"There's no token in the request"
			})
		}
		const {uid,exp} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
		

		const userAthenticated = await User.findById(uid)
		
		if(!userAthenticated) 
			res.status(401).json({
				msg:"Invalid token - user does not exist"
			})

		if(!userAthenticated.state) 
			res.status(401).json({
				msg:"Invalid token'"
			})
		
		req.user = userAthenticated.toJSON()

		req.uid = uid

		next()
	
	}catch(err){

		console.log(err.name)

		if (err.name.includes("TokenExpiredError")) {

			return res.status(500).json({
				tokenExpired:true
			})

		}

		return res.status(401).json({
			msg:"Invalid token"
		})
	}
}

module.exports=validateJwt