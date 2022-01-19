const ChemicalsModels = require('../models/chemical-model');

exports.allChemicals_get = async (req, res) => {
    const allChemicals = await ChemicalsModels.getAll();
        res.json(allChemicals).status(200) ({
            is_logged_in: req.session.is_logged_in,
            user_id: req.session.user_id
    });
}

exports.ChemicalByUserId_get = async (req, res) =>{
    const UserId = req.session.user_id;
    console.log('this is req params: ', req.session.user_id)
    console.log('user id being called is: ', UserId);
    const myChemicals = await ChemicalsModels.getByUserId(UserId);
        res.json(myChemicals).status(200) ({
            is_logged_in: req.session.is_logged_in,
            user_id: req.session.user_id
    });
}

exports.ChmeicalByLogId_get = async (req, res) =>{
    const LogId = req.session.user_id;
    console.log('this is req params: ', req.session.log_id)
    console.log('log id being called is: ', LogId);
    const myChemicals = await ChemicalsModels.getByLogId(LogId);
        res.json(myChemicals).status(200) ({
            is_logged_in: req.session.is_logged_in,
            user_id: req.session.user_id
    });
}

exports.newChemicals_get = async (req, res) => {
    if (!req.session.is_logged_in) {
        return res.redirect("/")
    } res.json( {
            is_logged_in: req.session.is_logged_in,
            user_id: req.session.user_id
    });
}

exports.deleteChemical_get = async (req, res, next) => {
    const chemicalId = req.params.chemical_id;
    const response = await ChemicalsModels.deleteChemical(chemicalId);
    console.log("response", response)
    if (response.command === "DELETE" && response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.send(`Could not delete logId: ${chemicalId}`).status(409);
    }
};

exports.addChemical_post = async (req, res) => {
    const { productname, rate, productamount, log_id } = req.body;
    console.log(req.body)
    LogsModels.addLog(productname, rate, productamount, log_id)
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

exports.updateChemical_put = async (req, res) => {
    const logId = req.params.log_id;
    console.log(req.body);
    const { productname, rate, productamount, log_id } = req.body;
    const response = await LogsModels.updateLog(chemicalId, productname, rate, productamount, log_id)
    if (response.command === "UPDATE" && response.rowCount >= 1) {
        res.sendStatus(200);
    } else {
        res.send(`Could not update chemical ${chemicalId}`).status(409)
                .then(async () => {
            const UserId = req.session.user_id;
    console.log('this is req params: ', req.session.user_id)
    console.log('user id being called is: ', UserId);
        const myChemicals = await LogsModels.getByLogId(LogId);
            res.json(myChemicals).status(200) ({
                is_logged_in: req.session.is_logged_in,
                user_id: req.session.user_id
            })
        .catch((err) => {
        res.sendStatus(500).send(err.message);
    });
})
    } 
};