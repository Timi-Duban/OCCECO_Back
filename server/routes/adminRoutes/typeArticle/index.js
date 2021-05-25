const express = require('express');
const router = express.Router();

router.post('/add', require("./addTypeArticle"));
router.delete('/delete', require("./deleteTypeArticle"));
router.patch('/update', require("./updateTypeArticle"));

module.exports =  router;
