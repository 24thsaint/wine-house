'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Registration = require('../dumb/Registration');

var _Registration2 = _interopRequireDefault(_Registration);

var _inputHelper = require('../helpers/inputHelper');

var _inputHelper2 = _interopRequireDefault(_inputHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RegistrationSmartComponent = function (_React$Component) {
  _inherits(RegistrationSmartComponent, _React$Component);

  function RegistrationSmartComponent(props) {
    _classCallCheck(this, RegistrationSmartComponent);

    var _this = _possibleConstructorReturn(this, (RegistrationSmartComponent.__proto__ || Object.getPrototypeOf(RegistrationSmartComponent)).call(this, props));

    _this.state = {
      formData: {
        fullClientName: '',
        username: '',
        password: ''
      }
    };
    _this.inputHelper = new _inputHelper2.default(_this);
    _this.registrationFormHandler = _this.registrationFormHandler.bind(_this);
    return _this;
  }

  _createClass(RegistrationSmartComponent, [{
    key: 'registrationFormHandler',
    value: function registrationFormHandler(evt) {
      evt.preventDefault();
      console.log(this.state.formData);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Registration2.default, {
          handleRegister: this.registrationFormHandler,
          handleInputChange: this.inputHelper.handleInputChange,
          formData: this.state.formData
        })
      );
    }
  }]);

  return RegistrationSmartComponent;
}(_react2.default.Component);

exports.default = RegistrationSmartComponent;