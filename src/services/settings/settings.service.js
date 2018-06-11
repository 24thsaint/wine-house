// Initializes the `settings` service on path `/api/settings`
const createService = require('feathers-mongodb');
const hooks = require('./settings.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/api/settings', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/settings');

  mongoClient.then(db => {
    service.Model = db.collection('settings');
  });

  service.hooks(hooks);
};
