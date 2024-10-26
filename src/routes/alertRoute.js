const express = require('express');
const {fetchKpiAlerts} = require('../controllers/alertController');
const router = express.Router();

router.get('/getKpiAlerts', fetchKpiAlerts); 


module.exports = router;