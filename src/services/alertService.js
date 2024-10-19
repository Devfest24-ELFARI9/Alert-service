require('dotenv').config();
const { consumeMessages, sendMessage } = require('../utils/rabbitMQUtils');
const mongoose = require('mongoose');
const Alert = require('../models/Alert');
const problemTypes = require('../config/problemTypes.json');
const Notification = require('../models/Notification'); 
const teams = require('../config/teams.json').teams; 

const determineTeam = (machineId, type) => {
  for (const [team, { machines, metrics }] of Object.entries(teams)) {
    if (machines.includes(machineId) && metrics.includes(type)) {
      return team;
    }
  }
  return "management";
};

const determineProblemType = (type, value) => {
    const typeConfig = problemTypes[type];
    if (typeConfig) {
      for (const [problem, { condition, message }] of Object.entries(typeConfig)) {
        const conditionFunction = new Function('value', `return ${condition}`);
        if (conditionFunction(value)) {
          return { problem, message };
        }
      }
    }
    return { problem: 'unknown', message: 'Unknown problem' };
  };

const processAlertMessage = async (message) => {
  const { machineId, type, value, timestamp } = JSON.parse(message);
  const team = determineTeam(machineId, type);

  if (team) {
    const { problem, message: problemMessage } = determineProblemType(type, value);

    const alert = new Alert({ machineId, type, value, timestamp, team, problem, problemMessage });
    await alert.save();

    const notificationMessage = {
      team,
      alert: { machineId, type, value, timestamp, problem, problemMessage }
    };

    // Save the notification to the database
    const notification = new Notification(notificationMessage);
    await notification.save();

    await sendMessage('notification-queue', JSON.stringify(notificationMessage));
    console.log(`Alert processed and notification sent: ${JSON.stringify(notificationMessage)}`);
  } else {
    console.log(`No team found for machineId: ${machineId}, type: ${type}`);
  }
};

const startAlertService = async () => {
  await consumeMessages('alert-queue', processAlertMessage);
};


module.exports = { startAlertService };