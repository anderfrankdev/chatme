const login = (req,res)=>{

	const token = req.session.token

	const render = token ? "redirect" : "login" 

	return res.render(render,{path:"/app/chat"})
} 

module.exports = {
	login
}