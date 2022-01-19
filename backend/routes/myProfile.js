const express = require('express'), 
    router = express.Router();

const LogModels = require('../models/log-model');
//const Users = require('../models/users-model');

const LogsController = require('../controllers/logs-controllers');
const UsersController = require('../controllers/users-controllers');

router.get('/', UsersController.user_page_get);

module.exports = router;