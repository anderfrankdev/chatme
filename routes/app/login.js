const {Router} = require("express");
const router = Router();
const {login} = require("../../controllers/app/login.js")

router.get("/", login)

module.exports = router