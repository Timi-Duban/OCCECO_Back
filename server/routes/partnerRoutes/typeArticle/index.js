const express = require('express');
const router = express.Router();

router.post('/add', require("./addTypeArticle"));
router.delete('/delete', require("./deleteTypeArticle"));
router.patch('/update', require("./updateTypeArticle"));
router.get('/list', require('./getAllTypes'));

module.exports =  router;
