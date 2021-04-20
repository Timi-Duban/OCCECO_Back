const express = require('express');
const router = express.Router();

router.patch('/updateUser', require("./updateUser"));


module.exports =  router;
