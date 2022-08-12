require('dotenv').config()
const {createServer} = require("http")
const eta = require("eta")
const express = require('express')
const cors = require('cors')
const useragent = require('express-useragent');
const cookieParser = require("cookie-parser")
const cookieSession = require('cookie-session')
const {socketController} = require("../sockets/socket-controller")


let instance;

class Server{
	constructor(){

		if (!instance) {

			this.app = express()
			this.server= createServer(this.app)
			this.io    = require("socket.io")(this.server)
			
			this.path = {
				app:"/app",
				api:{
					users:"/api/users",
					login:"/api/auth",
					search:"/api/search"
				}

			}

			this.port = process.env.PORT

			this.middlewares()
			this.renderEngine()

			this.routes();

			instance = this
		}

		return instance
	}

	routes(){

		this.app.use( this.path.app, require('../routes/app') )

		this.app.use( this.path.api.users, require('../routes/users') )

		this.app.use( this.path.api.login, require('../routes/auth') )
		this.app.use( this.path.api.search, require('../routes/search') )


		
	}
	renderEngine(){
		this.app.engine("eta", eta.renderFile)

		this.app.set("view engine", "eta")

		this.app.set("views", "./views")
	}

	middlewares(){
		// Read normal and Signed cookies
		this.app.use(cookieParser(process.env.SECRETORPRIVATEKEY, {
			httpOnly:true
		}));
		this.app.use( cookieSession({
			name: 'session',
			secret: process.env.SECRETORPRIVATEKEY,
			httpOnly:true
		}))

		//Public directory
		this.app.use( express.static(__dirname.replace("models","public"),{redirect: false}) )

		//CORS
		this.app.use( cors() )

		//Read the json
		this.app.use( express.json() )

		//Parse user agent
		this.app.use(useragent.express());
	}
	sockets(){
		this.io.on("connection", socket => socketController(socket,this.io))
	}

	listen(){

		this.server.listen(this.port,()=>{
			console.log("Running on http://localhost:"+this.port)
		})
		
	}

}

const app = Object.freeze( new Server() )

module.exports = app