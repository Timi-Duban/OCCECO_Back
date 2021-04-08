const express = require('express');
const router = express.Router();

router.post('/add', require("./addArticle"));
router.delete('/delete', require("./deleteArticle"));

module.exports =  router;
