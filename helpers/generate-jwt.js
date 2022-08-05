const jwt = require("jsonwebtoken");

const generateJWT = (uid,type) => {
	return new Promise((resolve, reject)=>{

		const payload = {uid,type}

		jwt.sign(payload,process.env.SECRETORPRIVATEKEY, {
			expiresIn:"15m"
		},(err, token)=>{
			if(err) {
				console.log(err)
				reject("Couldn't generate token")
			}else{
				resolve(token)
			}
		})


	})
}

module.exports=generateJWT