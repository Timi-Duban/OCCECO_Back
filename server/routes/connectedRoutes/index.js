const express = require('express');
const router = express.Router();

router.use('/account', require("./account"));
router.use('/user', require("./user"));


module.exports =  router;
