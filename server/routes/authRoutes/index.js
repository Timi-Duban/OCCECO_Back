const express = require('express');
const router = express.Router();

router.post('/login', require("./login"));
router.post('/signupPublic', require("./signupPublic"));
router.post('/forgotPassword', require("./forgotPassword"));


module.exports =  router;
