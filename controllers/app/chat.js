const jwt = require("jsonwebtoken")
const User = require('../../models/user');

const chat =  async(req,res)=>{

	const token = req.session.token
	console.log(token)
	const render = token ? "chat" : "redirect"

	let user=0;

	if (render=="chat"){

		const {uid,type} = jwt.decode(token, process.env.SECRETORPRIVATEKEY);
		user = await User.findById(uid)

	}


	return res.render(render,{
		user,
		path:"/"
	})
} 

module.exports = {
	chat
}