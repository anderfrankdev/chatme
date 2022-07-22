//Router
const {Router} = require("express");
const router = Router();

//Request-Response handlers
const {login} = require("../controllers/app/login.js")
const {chat} = require("../controllers/app/chat.js")

//Middlewares

const {deleteSlash} = require('../middlewares');

// Routes

router.get("/", deleteSlash, login)

router.get("/chat",deleteSlash, chat)

module.exports = router