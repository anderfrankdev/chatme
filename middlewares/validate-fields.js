const {validationResult} = require("express-validator")
const {request,response} = require("express")

const validate = (req=request,res=response,next)=>{
	const errors = validationResult(req)
	
	if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

  	next()
}

module.exports={
	validate
}