const { getKpiAlerts } = require('../services/alertService');

const fetchKpiAlerts = async (req, res) => {
    try {
        const kpiAlerts = await getKpiAlerts();
        res.json(kpiAlerts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch KPI alerts' });
    }
};

module.exports = { fetchKpiAlerts };