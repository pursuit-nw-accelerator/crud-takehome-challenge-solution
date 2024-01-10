const { Router } = require('express');

const {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
} = require('../queries/jobApplicationsQueries');

const { validateApplication, validateId } = require('../middleware');

const jobApplicationsController = Router();

jobApplicationsController.get('/', async (request, response) => {
  try {
    const applications = await getAllApplications();
    response.status(200).json({ data: applications });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

jobApplicationsController.get('/:id', validateId, async (request, response) => {
  try {
    const { id } = request; // from middleware
    const application = await getApplicationById(id);
    if (!application) {
      return response
        .status(404)
        .json({ error: `Could not find application with id ${id}` });
    }
    response.status(200).json({ data: application });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

jobApplicationsController.post(
  '/',
  validateApplication,
  async (request, response) => {
    try {
      const { application } = request; // from middleware
      const createdApplication = await createApplication(application);
      response.status(201).json({ data: createdApplication });
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }
);

jobApplicationsController.put(
  '/:id',
  validateId,
  validateApplication,
  async (request, response) => {
    try {
      const { id, application } = request; // from middleware
      const persistedApplication = await getApplicationById(id);
      if (!persistedApplication) {
        return response
          .status(404)
          .json({ error: `Could not find application with id ${id}` });
      }

      const updatedApplication = await updateApplication(
        Number(id),
        application
      );
      response.status(200).json({ data: updatedApplication });
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }
);

jobApplicationsController.delete(
  '/:id',
  validateId,
  async (request, response) => {
    try {
      const { id } = request; // from middleware
      const persistedApplication = await getApplicationById(id);
      if (!persistedApplication) {
        return response
          .status(404)
          .json({ error: `Could not find application with id ${id}` });
      }
      const deletedApplication = await deleteApplication(id);
      response.status(200).json({ data: deletedApplication });
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }
);

module.exports = jobApplicationsController;
