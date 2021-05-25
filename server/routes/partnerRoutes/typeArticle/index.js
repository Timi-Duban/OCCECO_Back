const express = require('express');
const router = express.Router();

router.get('/list', require('./getAllTypes'));

module.exports =  router;
