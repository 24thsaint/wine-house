'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wallet = require('../../client/ethereum/wallet');

var _wallet2 = _interopRequireDefault(_wallet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function execute(hook) {
  console.log(hook);
  var wallet = new _wallet2.default();
  var encryptedWallet = wallet.encrypt(hook.password);
  hook.data.wallet = console.log(new _wallet2.default());
}

exports.default = execute;