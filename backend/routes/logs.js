const express = require('express'), 
    router = express.Router();

const LogsModels = require('../models/Log-model');
const User = require('../models/users-model');

const LogController = require('../controllers/Logs-controllers');

router.get('/', LogController.allLogs_get);

router.get('/new', LogController.newLogs_get);

//router.get('/logid', LogController.LogId_get);

router.post('/', LogController.addLog_post);

router.put('/updateLog/:log_id?', LogController.updateLog_put);

router.get('/deleteLog/:log_id?', LogController.deleteLog_get);

router.get('/myLog', LogController.LogByUserId_get);


module.exports = router;