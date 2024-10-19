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

module.exports = { getNotifications , resolveNotificationById };