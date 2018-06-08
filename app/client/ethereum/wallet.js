'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ethers = require('ethers');

var _ethers2 = _interopRequireDefault(_ethers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Wallet = function Wallet(privateKey) {
  _classCallCheck(this, Wallet);

  if (privateKey) {
    this.wallet = new _ethers2.default.Wallet(privateKey);
  } else {
    this.wallet = new _ethers2.default.Wallet.createRandom();
  }
};

exports.default = Wallet;