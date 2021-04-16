const express = require('express');
const router = express.Router();

router.patch('/updateMail', require("./updateMail"));
router.post('/getByMail', require("./getAccountByMail"))
router.get('/getAll', require("./getAllAccounts"))

module.exports =  router;