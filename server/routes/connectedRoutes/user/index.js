const express = require('express');
const router = express.Router();

router.patch('/updateUser', require("./updateUser"));
router.post('/addPushToken', require("./addPushToken"))
router.post('/getUser', require("./getUserById"))

module.exports =  router;
