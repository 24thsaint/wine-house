'use strict';

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

var _feathers = require('@feathersjs/feathers');

var _feathers2 = _interopRequireDefault(_feathers);

var _socketioClient = require('@feathersjs/socketio-client');

var _socketioClient2 = _interopRequireDefault(_socketioClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var socket = (0, _socket2.default)(window.location.host); /* global window */

var client = (0, _feathers2.default)();

client.configure((0, _socketioClient2.default)(socket));

window.app = client;