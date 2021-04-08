const express = require('express');
const router = express.Router();

router.post('/signupUpper', require("./signupUpper"));

module.exports =  router;