const mongoose = require('mongoose');

const kpiAlertSchema = new mongoose.Schema({
    KPI_Name: { type: String, required: true },
    KPI_Value: { type: Number, required: true },
    Timestamp: { type: Date, required: true },

});

module.exports = mongoose.model('KpiAlert', kpiAlertSchema);