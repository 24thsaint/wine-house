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

var WineRegistration = function (_React$Component) {
  _inherits(WineRegistration, _React$Component);

  function WineRegistration(props) {
    _classCallCheck(this, WineRegistration);

    return _possibleConstructorReturn(this, (WineRegistration.__proto__ || Object.getPrototypeOf(WineRegistration)).call(this, props));
  }

  _createClass(WineRegistration, [{
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
          'h1',
          null,
          'Wine Registration'
        ),
        _react2.default.createElement(
          'form',
          { onSubmit: this.props.handleRegister },
          _react2.default.createElement(
            _Paper2.default,
            { style: { padding: 20 }, elevation: 5 },
            _react2.default.createElement(
              _Grid2.default,
              { item: true },
              _react2.default.createElement(_TextField2.default, {
                id: 'cork',
                name: 'cork',
                label: 'Cork',
                value: this.props.formData.cork,
                onChange: this.props.handleInputChange,
                margin: 'normal'
              })
            ),
            _react2.default.createElement(
              _Grid2.default,
              { item: true },
              _react2.default.createElement(_TextField2.default, {
                id: 'capsule',
                name: 'capsule',
                label: 'Capsule',
                value: this.props.formData.capsule,
                onChange: this.props.handleInputChange,
                margin: 'normal'
              })
            ),
            _react2.default.createElement(
              _Grid2.default,
              { item: true },
              _react2.default.createElement(_TextField2.default, {
                id: 'glass',
                name: 'glass',
                label: 'Glass',
                value: this.props.formData.glass,
                onChange: this.props.handleInputChange,
                margin: 'normal'
              })
            ),
            _react2.default.createElement(
              _Grid2.default,
              { item: true },
              _react2.default.createElement(_TextField2.default, {
                id: 'frontLabel',
                name: 'frontLabel',
                label: 'Front Label',
                value: this.props.formData.frontLabel,
                onChange: this.props.handleInputChange,
                margin: 'normal'
              })
            ),
            _react2.default.createElement(
              _Grid2.default,
              { item: true },
              _react2.default.createElement(_TextField2.default, {
                id: 'backLabel',
                name: 'backLabel',
                label: 'Back Label',
                value: this.props.formData.backLabel,
                onChange: this.props.handleInputChange,
                margin: 'normal'
              })
            ),
            _react2.default.createElement(
              _Grid2.default,
              { item: true },
              _react2.default.createElement(_TextField2.default, {
                id: 'bottle',
                name: 'bottle',
                label: 'Bottle',
                value: this.props.formData.bottle,
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
                  onClick: this.props.handleRegister,
                  type: 'submit'
                },
                'Submit'
              )
            )
          )
        )
      );
    }
  }]);

  return WineRegistration;
}(_react2.default.Component);

exports.default = WineRegistration;