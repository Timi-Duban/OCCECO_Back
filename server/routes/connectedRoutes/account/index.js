const express = require('express');
const router = express.Router();

router.patch('/updateMail', require("./updateMail"));
router.patch('/updatePassword', require("./updatePassword"));


module.exports =  router;
