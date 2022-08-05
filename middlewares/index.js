const deleteSlash = require("./delete-slash")
const {validate} = require('./validate-fields')
const validateJwt = require('./validate-jwt')
const refreshJwt = require('./refresh-jwt')

module.exports = {
	validate,
	validateJwt,
	
	refreshJwt,
	deleteSlash
}