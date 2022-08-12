const {Router} = require("express");
const jwt = require("jsonwebtoken")
const router = Router();
const {refreshJwt} = require('../middlewares') 
const User = require('../models/user');

router.get('/',refreshJwt, async (req,res)=>{

	if (req.redirect) {
		req.session = null
		res.cookie('out', true, { httpOnly: true})
		return res.render("redirect",{
			path:"/api/auth/login"
		})
	}

	const token = req.token

	const {uid} = jwt.decode(token, process.env.SECRETORPRIVATEKEY)
	const userAthenticated = await User.findById(uid)

	if(!userAthenticated){

		req.session = null
		req.redirect = true
		res.cookie('out', true, { httpOnly: true})
		return res.render("redirect",{
			path:"/api/auth/login"
		})
	}

	if(!userAthenticated.state){

		req.session = null	
		req.redirect = true
		res.cookie('out', true, { httpOnly: true})
		return res.render("redirect",{
			path:"/api/auth/login"
		})
	}
	
	if (req.redirect) {
		res.cookie('out', true, { httpOnly: true})
		return res.render("redirect",{
			path:"/api/auth/login"
		})
	}

	return res.render("chat",{
		token,
		user:userAthenticated
	})
})

module.exports = router