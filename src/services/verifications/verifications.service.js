// Initializes the `verifications` service on path `/api/verifications`
const createService = require('feathers-mongodb');
const hooks = require('./verifications.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/api/verifications', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/verifications');

  mongoClient.then(db => {
    service.Model = db.collection('verifications');
  });

  service.hooks(hooks);
};
