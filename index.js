require('dotenv').config()
const {app} = require("./models")
const {dbConnection} = require("./database/config");

async function main(){
	
	await dbConnection()

	app.listen()
	
}

main()
