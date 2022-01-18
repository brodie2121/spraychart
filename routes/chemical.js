const express = require('express'), 
    router = express.Router();

const ChemicalsModels = require('../models/chemical-model');
const User = require('../models/users-model');

const ChemicalController = require('../controllers/chemical-controllers');

router.get('/', ChemicalController.allChemicals_get);

router.get('/new', ChemicalController.newChemicals_get);

//router.get('/chemicalid', ChemicalController.ChemicalId_get);

router.post('/', ChemicalController.addChemical_post);

router.put('/updatechemical/:chemical_id?', ChemicalController.updateChemical_put);

router.get('/deletechemical/:chemical_id?', ChemicalController.deleteChemical_get);

router.get('/mychemical', ChemicalController.ChemicalByUserId_get);

router.get('/mylogchemical', ChemicalController.ChmeicalByLogId_get);

module.exports = router;