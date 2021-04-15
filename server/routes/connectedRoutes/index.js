const express = require('express');
const router = express.Router();

router.put('/updateUser', require("./updateUser"));


module.exports =  router;
