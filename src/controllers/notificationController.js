const KpiAlertNotification = require('../models/KpiAlertNotification');
const { fetchNotifications } = require('../services/notificationService');
const { resolveNotification } = require('../services/notificationService');

const getNotifications = async (req, res) => {
  const { team } = req.params;
  try {
    const notifications = await fetchNotifications(team);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

const resolveNotificationById = async (req, res) => {
    const { id } = req.params;
    try {
      await resolveNotification(id);
      res.json({ message: 'Notification resolved' });

    } catch (error) {
      res.status(500).json({ error: 'Failed to resolve notification' });
    }
  };

const getKpiAlertsNotifications = async ()=>{
  try{
    const KpiAlertsNotificationsList = await KpiAlertNotification.find();
    res.json(KpiAlertsNotificationsList);
  }catch(error){
    res.status(500).json({error: "failed to fetch alerts notifications"});
  }
}

module.exports = { getNotifications , resolveNotificationById , getKpiAlertsNotifications };