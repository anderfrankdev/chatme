const {body,param} = require("express-validator")
const {Router} = require('express')
const {getUsers,putUsers,postUsers,deleteUsers} = require("../controllers/api/users")
const router = Router()
const {validateRole,validateUserId} = require("../helpers/db-validator")

const {
	validate,
	validateJwt
} = require("../middlewares")

router.get("/", getUsers)

router.put("/:id",[
	param("id","Invalid id").isMongoId(),
	param('id').custom(validateUserId),
	validate
],putUsers)

router.post("/",[
	body('username','The username name is obligatory').not().isEmpty(),
	body('password','The password must 6 digits long').isLength({min:6}),
	body('email','The email is invalid').isEmail(),
	validate
], postUsers)

router.delete("/:id", [
	validateJwt,
	param("id","Invalid id").isMongoId(),
	param('id').custom(validateUserId),
	validate
], deleteUsers)

module.exports = router