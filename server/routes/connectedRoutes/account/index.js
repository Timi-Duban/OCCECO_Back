const express = require('express');
const router = express.Router();

router.patch('/updateMail', require("./updateMail"));


module.exports =  router;
