'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Paper = require('@material-ui/core/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Grid = require('@material-ui/core/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _core = require('@material-ui/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_React$Component) {
  _inherits(Login, _React$Component);

  function Login(props) {
    _classCallCheck(this, Login);

    return _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));
  }

  _createClass(Login, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _Grid2.default,
        {
          container: true,
          alignItems: 'center',
          justify: 'center',
          direction: 'column'
        },
        _react2.default.createElement(
          'form',
          { onSubmit: this.props.handleLogin },
          _react2.default.createElement(
            _Paper2.default,
            { style: { padding: 20 }, elevation: 5 },
            _react2.default.createElement(
              _Grid2.default,
              { item: true },
              _react2.default.createElement(_TextField2.default, {
                id: 'username',
                name: 'username',
                label: 'Username',
                value: this.props.formData.username,
                onChange: this.props.handleInputChange,
                margin: 'normal'
              })
            ),
            _react2.default.createElement(
              _Grid2.default,
              { item: true },
              _react2.default.createElement(_TextField2.default, {
                id: 'password',
                name: 'password',
                label: 'Password',
                type: 'password',
                value: this.props.formData.password,
                onChange: this.props.handleInputChange,
                margin: 'normal'
              })
            ),
            _react2.default.createElement(
              _Grid2.default,
              { item: true },
              _react2.default.createElement(
                _core.Button,
                {
                  color: 'primary',
                  variant: 'contained',
                  onClick: this.props.handleLogin,
                  type: 'submit'
                },
                'Login'
              )
            )
          )
        )
      );
    }
  }]);

  return Login;
}(_react2.default.Component);

exports.default = Login;