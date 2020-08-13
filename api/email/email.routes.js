const express = require('express')
const {sendEmail} = require('./email.controller')
const router = express.Router()


router.post('/',sendEmail)

module.exports = router

