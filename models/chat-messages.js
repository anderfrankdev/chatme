const Message = require('./Messages')

class ChatMessages{
	constructor(){
		this.messages = []
		this.users = {}
	}

	get last10(){

		return this.messages.splice(0,10)
	}

	get usersArr(){
		return Object.values(this.users)
	}

	sendMessage(message,uid,name){
		this.messages.unshift(
			new Message(message,uid,name)
		)
	}

	connectUser(user){
		this.users[user.id] = user
	}

	disconnectUser(id){
		delete this.users[id];
	}
}

module.exports = ChatMessages