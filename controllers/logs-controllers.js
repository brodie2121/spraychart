const LogsModels = require('../models/log-model');

exports.allLogs_get = async (req, res) => {
    const allLogs = await LogsModels.getAll();
        res.json(allLogs).status(200) ({
            is_logged_in: req.session.is_logged_in,
            user_id: req.session.user_id
    });
}

exports.LogByUserId_get = async (req, res) =>{
    const UserId = req.session.user_id;
    console.log('this is req params: ', req.session.user_id)
    console.log('user id being called is: ', UserId);
    const myLogs = await LogsModels.getByUserId(UserId);
        res.json(myLogs).status(200) ({
            is_logged_in: req.session.is_logged_in,
            user_id: req.session.user_id
    });
}

exports.newLogs_get = async (req, res) => {
    if (!req.session.is_logged_in) {
        return res.redirect("/users/login")
    } res.json( {
            is_logged_in: req.session.is_logged_in,
            user_id: req.session.user_id
    });
  }

exports.addLog_post = async (req, res) => {
    const { dateapplied, opperator, holestreated, area, settings, totalgallons, sprayrig, notes, log_user_id } = req.body;
    console.log(req.body)
    LogsModels.addLog(dateapplied, opperator, holestreated, area, settings, totalgallons, sprayrig, notes, log_user_id)
    .then(async () => {
            const UserId = req.session.user_id;
    console.log('this is req params: ', req.session.user_id)
    console.log('user id being called is: ', UserId);
        const myLogs = await LogsModels.getByUserId(UserId);
            res.json(myLogs).status(200) ({
                is_logged_in: req.session.is_logged_in,
                user_id: req.session.user_id
            })
        .catch((err) => {
        res.sendStatus(500).send(err.message);
    });
})}

exports.updateLog_put = async (req, res) => {
    const logId = req.params.log_id;
    console.log(req.body);
    const { dateapplied, opperator, holestreated, area, settings, totalgallons, sprayrig, notes, log_user_id } = req.body;
    const response = await LogsModels.updateLog(logId, dateapplied, opperator, holestreated, area, settings, totalgallons, sprayrig, notes, log_user_id)
    if (response.command === "UPDATE" && response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.send(`Could not update spray log ${logId}`).status(409)
                .then(async () => {
            const UserId = req.session.user_id;
    console.log('this is req params: ', req.session.user_id)
    console.log('user id being called is: ', UserId);
        const myLogs = await LogsModels.getByUserId(UserId);
            res.json(myLogs).status(200) ({
                is_logged_in: req.session.is_logged_in,
                user_id: req.session.user_id
            })
        .catch((err) => {
        res.sendStatus(500).send(err.message);
    });
})
    } 
};