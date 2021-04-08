const express = require('express');
const router = express.Router();

router.post('/login', require("./login"));
router.post('/signupPublic', require("./signupPublic"));


module.exports =  router;
