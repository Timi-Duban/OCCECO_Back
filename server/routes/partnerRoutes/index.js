const express = require('express');
const router = express.Router();

router.use('/article', require("./article"));
router.use('/typeArticle', require("./typeArticle"));

module.exports =  router;