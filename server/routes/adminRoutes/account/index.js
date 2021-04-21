const express = require('express');
const router = express.Router();

router.patch('/updateType', require("./updateType"));
router.post('/getByMail', require("./getAccountByMail"))
router.get('/getAll', require("./getAllAccounts"))

module.exports =  router;