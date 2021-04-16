const express = require('express');
const router = express.Router();

router.patch('/update', require("./updateAccount"));

module.exports =  router;