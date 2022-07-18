require('dotenv').config()
const {createServer} = require("http")
const eta = require("eta")
const express = require('express')
const cors = require('cors')
var useragent = require('express-useragent');

let instance;

class Server{
	constructor(){

		if (!instance) {

			this.app = express()
			this.server= createServer(this.app)
			this.path = {
				app:"/app",
				api:{

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

		this.app.use( this.path.app, require('../routes/app/login') )
		this.app.use( this.path.app, require('../routes/app/chat') )
		
	}
	renderEngine(){
		this.app.engine("eta", eta.renderFile)

		this.app.set("view engine", "eta")

		this.app.set("views", "./views")
	}

	middlewares(){

		//Public directory
		this.app.use( express.static(__dirname.replace("models","public"),{redirect: false}) )

		//CORS
		this.app.use( cors() )

		//Read the json
		this.app.use( express.json() )

		//Parse user agent
		this.app.use(useragent.express());
	}

	listen(){

		this.server.listen(this.port,()=>{
			console.log("Running on http://localhost:"+this.port)
		})
		
	}

}

const app = Object.freeze( new Server() )

module.exports = app