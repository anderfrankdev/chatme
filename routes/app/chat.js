const {Router} = require("express");
const router = Router();
const {chat} = require("../../controllers/app/chat.js")

router.get("/chat", chat)

module.exports = router