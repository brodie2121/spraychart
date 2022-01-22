const express = require('express'), 
    router = express.Router();

const LogsModels = require('../models/log-model');
const User = require('../models/users-model');

const LogController = require('../controllers/logs-controllers');


router.get('/', LogController.LogByUserId_get);

module.exports = router;