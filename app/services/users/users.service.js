'use strict';

var _feathersMongodb = require('feathers-mongodb');

var _feathersMongodb2 = _interopRequireDefault(_feathersMongodb);

var _users = require('./users.hooks');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {
  var paginate = app.get('paginate');
  var mongoClient = app.get('mongoClient');
  var options = { paginate: paginate };

  // Initialize our service with any options it requires
  app.use('/api/users', (0, _feathersMongodb2.default)(options));

  // Get our initialized service so that we can register hooks and filters
  var service = app.service('/api/users');

  mongoClient.then(function (db) {
    service.Model = db.collection('users');
  });

  service.hooks(_users2.default);
};