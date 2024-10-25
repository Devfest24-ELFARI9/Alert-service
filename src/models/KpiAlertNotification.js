const mongoose = require('mongoose');

const kpiAlertNotificationSchema = new mongoose.Schema({
    KPI_Name: { type: String, required: true },
    KPI_Value: { type: Number, required: true },
    Timestamp: { type: Date, required: true },
    title:{type : String},
    description:{type : String}

});

module.exports = mongoose.model('kpiAlertNotification', kpiAlertNotificationSchema);