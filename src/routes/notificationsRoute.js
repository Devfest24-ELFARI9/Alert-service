const express = require('express');
const { getNotifications } = require('../controllers/notificationController');
const { resolveNotificationById } = require('../controllers/notificationController');
const router = express.Router();

router.get('/getNotification/:team', getNotifications);
router.post('/resolveNotification/:id', resolveNotificationById); // Add the new endpoint


module.exports = router;