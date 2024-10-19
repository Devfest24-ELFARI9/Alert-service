const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  machineId: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: Number, required: true },
  timestamp: { type: Date, required: true },
  team: { type: String, required: true },
  problem: { type: String, required: true },
  problemMessage: { type: String, required: true }
});

module.exports = mongoose.model('Alert', alertSchema);