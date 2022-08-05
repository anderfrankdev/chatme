const User = require('../../models/user');
const bcrypt = require("bcryptjs");
const generateJWT = require("../../helpers/generate-jwt");
const {validateJwt} = require('../../middlewares')


const login = async (req,res)=>{

	const {password,email,type} = req.body
	
	if(!type){
		return res.status(500).json({msg:"There's no login type"})
	}

	try{

		const user = await User.findOne({email})

		if (!user) {
			res.json({
				msg:"Invalid email or password - email"
			})
		};

		const validPassword = bcrypt
							  .compareSync( String(password), user.password);

		if (!validPassword)
			res.json({
				msg:"Invalid email or password - password"
			})

		// Generate JWT
		console.log(type)
		const token = await generateJWT(user.id,type)
		
		if (type=="session") {
			req.session.token = token
				return res.status(200).json({msg:"Logged sucessfully"})

		}

		if (type=="api") {
			return res.json({user,token})
		}

		if(type!="session"&&type!="api") 
			return res.status(500).json({msg:"There's no login type"})

	}catch(err){
		console.log(err)
		return res.status(500).json({msg:"Talk to the administrator"})
	}
}

const refreshJWT = async (req,res)=>{
	const token = res.body.token
}

module.exports ={ 
	login,
	refreshJWT
}