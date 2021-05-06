const express = require('express');
const router = express.Router();

router.patch('/updateUser', require("./updateUser"));
router.post('/addPushToken', require("./addPushToken"))

module.exports =  router;
