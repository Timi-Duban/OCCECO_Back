const express = require('express');
const router = express.Router();

router.patch('/updateUser', require("./updateUser"));
router.use('/account', require("./account"))


module.exports =  router;
