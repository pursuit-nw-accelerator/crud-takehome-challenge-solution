const applicationStatuses = require('../constants');
const APPLICATION_FIELDS = ['company', 'url', 'status'];

const validateId = (request, response, next) => {
  const { id } = request.params;

  if (!Number.isInteger(Number(id)) || Number(id) < 1) {
    return response
      .status(400)
      .json({ error: `id must be positive integer; received ${id}` });
  }
  request.id = Number(id);
  next();
};

const validateApplication = (request, response, next) => {
  const application = request.body;

  for (const field of APPLICATION_FIELDS) {
    if (field === 'url' && application[field] === undefined) {
      application[field] = null;
    } else if (application[field] === undefined) {
      return response
        .status(400)
        .json({ error: `field ${field} must be present` });
    }
  }

  const { status } = application;
  if (!applicationStatuses.hasOwnProperty(status)) {
    return response.status(400).json({
      error: `status must be one of ${Object.values(applicationStatuses).join(
        ', '
      )}; received ${status} `,
    });
  }

  for (const field in application) {
    if (!APPLICATION_FIELDS.includes(field)) {
      return response.status(400).json({ error: `field ${field} not allowed` });
    }
  }

  request.application = application;
  next();
};

module.exports = {
  validateId,
  validateApplication,
};
