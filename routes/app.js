//Router
const {Router} = require("express");
const router = Router();

//Request-Response handlers
const {login} = require("../controllers/app/login.js")
const {chat} = require("../controllers/app/chat.js")

//Middlewares



// Routes

router.get("/", login)

router.get("/chat", chat)

module.exports = router