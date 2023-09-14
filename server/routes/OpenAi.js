const express = require("express")
const router = express.Router()

const {chatBox} = require("../controllers/chatbox") 

router.post("/chatBox", chatBox)

module.exports = router