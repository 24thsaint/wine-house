'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _Dialog = require('@material-ui/core/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _DialogActions = require('@material-ui/core/DialogActions');

var _DialogActions2 = _interopRequireDefault(_DialogActions);

var _DialogContent = require('@material-ui/core/DialogContent');

var _DialogContent2 = _interopRequireDefault(_DialogContent);

var _DialogContentText = require('@material-ui/core/DialogContentText');

var _DialogContentText2 = _interopRequireDefault(_DialogContentText);

var _DialogTitle = require('@material-ui/core/DialogTitle');

var _DialogTitle2 = _interopRequireDefault(_DialogTitle);

var _core = require('@material-ui/core');

var _Registration = require('../dumb/Registration');

var _Registration2 = _interopRequireDefault(_Registration);

var _inputHelper = require('../helpers/inputHelper');

var _inputHelper2 = _interopRequireDefault(_inputHelper);

var _client = require('../client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
      },
      // 0 = neutral, 1 = error, 2 = successful, 3 = success redirect
      registrationStatus: 0,
      open: false
    };
    _this.inputHelper = new _inputHelper2.default(_this);
    _this.registrationFormHandler = _this.registrationFormHandler.bind(_this);
    _this.handleClose = _this.handleClose.bind(_this);
    return _this;
  }

  _createClass(RegistrationSmartComponent, [{
    key: 'componentDidMount',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _client2.default.service('api/users');

              case 2:
                this.userService = _context.sent;

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _ref.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: 'registrationFormHandler',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(evt) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                evt.preventDefault();
                _context2.next = 3;
                return this.userService.create(this.state.formData);

              case 3:
                result = _context2.sent;

                if (result._id) {
                  this.setState({
                    registrationStatus: 2,
                    open: true
                  });
                } else {
                  this.setState({
                    registrationStatus: 1
                  });
                }

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function registrationFormHandler(_x) {
        return _ref2.apply(this, arguments);
      }

      return registrationFormHandler;
    }()
  }, {
    key: 'handleClose',
    value: function handleClose() {
      this.setState({
        registrationStatus: 3
      });
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
        }),
        _react2.default.createElement(
          _Dialog2.default,
          {
            open: this.state.open,
            onClose: this.handleClose,
            'aria-labelledby': 'alert-dialog-title',
            'aria-describedby': 'alert-dialog-description'
          },
          _react2.default.createElement(
            _DialogTitle2.default,
            { id: 'alert-dialog-title' },
            'Registration Successful!'
          ),
          _react2.default.createElement(
            _DialogContent2.default,
            null,
            _react2.default.createElement(
              _DialogContentText2.default,
              { id: 'alert-dialog-description' },
              'You may now login.'
            )
          ),
          _react2.default.createElement(
            _DialogActions2.default,
            null,
            _react2.default.createElement(
              _core.Button,
              { onClick: this.handleClose, color: 'primary', autoFocus: true },
              'Ok'
            )
          )
        ),
        this.state.registrationStatus === 3 ? _react2.default.createElement(_reactRouterDom.Redirect, { to: '/' }) : undefined
      );
    }
  }]);

  return RegistrationSmartComponent;
}(_react2.default.Component);

exports.default = RegistrationSmartComponent;