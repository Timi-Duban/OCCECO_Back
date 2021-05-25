const express = require('express');
const router = express.Router();

router.post('/signupUpper', require("./signupUpper"));
router.get('/sendDailyNotifications', require("./sendDailyNotifications"));
router.use('/account', require("./account"));
router.use('/typeArticle', require("./typeArticle"));

module.exports =  router;