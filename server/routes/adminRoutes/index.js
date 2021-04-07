const express = require('express');
const router = express.Router();

router.post('/signup', require("./signup"));

module.exports =  router;