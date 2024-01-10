const express = require('express');
const cors = require('cors');
const jobApplicationsController = require('./controllers/jobApplicationsController');

const app = express();

// TODO: Add application-wide middleware
app.use(cors());
app.use(express.json());

// TODO: Add controller(s)
app.use('/applications', jobApplicationsController);

// TODO: Implement health check route
app.get('/', (request, response) => {
  response.status(200).json({ data: 'Service is running' });
});

module.exports = app;
