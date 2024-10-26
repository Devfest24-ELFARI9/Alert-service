const express = require('express');
const { getNotifications, getKpiAlertsNotifications } = require('../controllers/notificationController');
const { resolveNotificationById } = require('../controllers/notificationController');
const router = express.Router();

router.get('/getNotification/:team', getNotifications);
router.post('/resolveNotification/:id', resolveNotificationById);
router.get('/getKpiAlertsNotifications',getKpiAlertsNotifications);


module.exports = router;