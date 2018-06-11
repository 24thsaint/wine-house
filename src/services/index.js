import apiUsers from './users/users.service';
const settings = require('./settings/settings.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(apiUsers);
  app.configure(settings);
};
