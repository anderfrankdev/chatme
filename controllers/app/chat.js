const chat = (req,res)=>{
	res.render("chat",{
		user:{
			name:"Ander"
		}
	})
} 

module.exports = {
	chat
}