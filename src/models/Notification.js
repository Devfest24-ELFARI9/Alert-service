const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  machineId: String,
  type: String,
  value: Number,
  timestamp: Date,
  problem: String,
  problemMessage: String
});

const notificationSchema = new mongoose.Schema({
  team: String,
  alert: alertSchema, // Use the nested schema for the alert field
  resolved: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);