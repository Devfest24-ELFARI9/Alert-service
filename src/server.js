const express = require('express');
const mongoose = require('mongoose');
const { startAlertService } = require('./services/alertService');
const notificationRoutes = require('./routes/notificationsRoute');

const app = express();
const port = process.env.PORT || 3020;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    return startAlertService();
  })
  .then(() => {
    console.log('Alert service started');
    app.use('/',notificationRoutes)
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Error:', err);
  });
