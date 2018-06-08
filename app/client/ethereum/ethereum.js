'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var web3 = new _web2.default(new _web2.default.providers.HttpProvider('http://localhost:8545'));

var Ethereum = function Ethereum() {
  _classCallCheck(this, Ethereum);
};

exports.default = Ethereum;