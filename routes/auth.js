const {Router} = require("express");
const {check} = require("express-validator")
const {validate} = require('../middlewares/validate-fields')

const { login }= require('../controllers/api/login')

const router = Router();

router.post("/login", [
	check("email", "The email is obligatory").isEmail(),
	check("password", "The password is obligatory").not().isEmpty(),
	validate
], login)


router.get("/logout",(req,res)=>{

	req.session = null
	res.clearCookie("session")
	res.clearCookie("session.sig")
	res.clearCookie("g_state")
	res.cookie('out', true, { httpOnly: true})
	
	
	return res.redirect(301, "/")

})

module.exports=router