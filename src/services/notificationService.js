const Notification = require('../models/Notification');

const fetchNotifications = async (team) => {
  return await Notification.find({ team }).exec();
};

const resolveNotification = async (id) => {
    return await Notification.findByIdAndUpdate(id, { resolved: true }).exec();
  };

module.exports = { fetchNotifications , resolveNotification };