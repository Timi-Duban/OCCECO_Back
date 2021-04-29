const express = require('express');
const router = express.Router();

router.post('/add', require("./addArticle"));
router.post('/update', require("./updateArticle"));
router.delete('/delete', require("./deleteArticle"));
router.get('/getAll', require("./getAllArticles"));

module.exports =  router;
