'use strict';

var _users = require('./users/users.service');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(_users2.default);
};