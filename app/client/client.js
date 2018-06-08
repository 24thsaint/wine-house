'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

var _feathers = require('@feathersjs/feathers');

var _feathers2 = _interopRequireDefault(_feathers);

var _socketioClient = require('@feathersjs/socketio-client');

var _socketioClient2 = _interopRequireDefault(_socketioClient);

var _authenticationClient = require('@feathersjs/authentication-client');

var _authenticationClient2 = _interopRequireDefault(_authenticationClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global window */

var socket = (0, _socket2.default)(window.location.host);
var client = (0, _feathers2.default)();

client.configure((0, _socketioClient2.default)(socket));

var authenticationOptions = {
  header: 'Authorization', // the default authorization header for REST
  path: '/authentication', // the server-side authentication service path
  jwtStrategy: 'jwt', // the name of the JWT authentication strategy 
  entity: 'user', // the entity you are authenticating (ie. a users)
  service: 'users', // the service to look up the entity
  cookie: 'feathers-jwt', // the name of the cookie to parse the JWT from when cookies are enabled server side
  storageKey: 'feathers-jwt', // the key to store the accessToken in localstorage or AsyncStorage on React Native
  storage: window.localStorage // Passing a WebStorage-compatible object to enable automatic storage on the client.
};

client.configure((0, _authenticationClient2.default)(authenticationOptions));

window.app = client;

exports.default = client;