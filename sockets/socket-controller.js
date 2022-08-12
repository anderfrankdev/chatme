const {Socket}       = require("socket.io")
const Chat	 = require("../models/chat-messages")
const jwt = require("jsonwebtoken")

console.log() 

const chat = new Chat()


const socketController = async ( socket = new Socket(),io)=>{
	

	console.log(`Client connected`)
	
	/*const user = {
		name:socket.handshake.headers["username"],
		id:socket.handshake.headers["userid"]
	}

	const token = socket.handshake.headers["token"]
	
	let id;

	try{
		const {uid} = jwt.decode(token, process.env.SECRETORPRIVATEKEY)
		id=uid;
	}catch(err){
		console.log("No token")
	}

	if (id!=user.id||!token||!user.id||!user.name) {
		socket.disconnect(socket.id)
	}

	chat.connectUser(user)

	socket.join(user.id)


	io.emit("active-users",chat.usersArr)

	socket.on("send-msg",(payload)=>{
		let message = payload.from.txt,
			uid 	= payload.from.uid
			name 	= payload.from.name

		if(payload.to.uid.length!=24){
			chat.sendMessage(message,uid,name)
			io.emit("recieve-msg", payload.from);
		}else{
			console.log("private")
			socket.to(payload.to.uid).emit("recieve-private-msg", payload.from);
		}

	})	



	socket.on("disconnect", ()=> {
		chat.disconnectUser(user.id)

		console.log("Client "+user.name+" disconnected")
		
		io.emit("active-users",chat.usersArr)	
	})
	
	io.emit("check-messages",chat.messages)*/
}

module.exports = {
	socketController
}