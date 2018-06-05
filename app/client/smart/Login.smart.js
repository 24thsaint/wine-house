'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _HomeView = require('../dumb/HomeView');

var _HomeView2 = _interopRequireDefault(_HomeView);

var _inputHelper = require('../helpers/inputHelper');

var _inputHelper2 = _interopRequireDefault(_inputHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginSmartComponent = function (_React$Component) {
  _inherits(LoginSmartComponent, _React$Component);

  function LoginSmartComponent(props) {
    _classCallCheck(this, LoginSmartComponent);

    var _this = _possibleConstructorReturn(this, (LoginSmartComponent.__proto__ || Object.getPrototypeOf(LoginSmartComponent)).call(this, props));

    _this.state = {
      formData: {
        username: '',
        password: ''
      }
    };
    _this.inputHelper = new _inputHelper2.default(_this);
    _this.loginAction = _this.loginAction.bind(_this);
    return _this;
  }

  _createClass(LoginSmartComponent, [{
    key: 'componenWillMount',
    value: function componenWillMount() {
      this.inputHelper = new _inputHelper2.default(this);
    }
  }, {
    key: 'loginAction',
    value: function loginAction() {
      console.log(this.state.formData);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_HomeView2.default, {
          handleLogin: this.loginAction,
          handleInputChange: this.inputHelper.handleInputChange,
          formData: this.state.formData
        })
      );
    }
  }]);

  return LoginSmartComponent;
}(_react2.default.Component);

exports.default = LoginSmartComponent;