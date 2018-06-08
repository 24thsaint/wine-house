import apiUsers from './users/users.service';
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(apiUsers);
};
