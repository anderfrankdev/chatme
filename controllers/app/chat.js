const chat = (req,res)=>{
	console.log(req.useragent)
	res.render("chat")
} 

module.exports = {
	chat
}