'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _HomeView = require('../dumb/HomeView');

var _HomeView2 = _interopRequireDefault(_HomeView);

var _inputHelper = require('../helpers/inputHelper');

var _inputHelper2 = _interopRequireDefault(_inputHelper);

var _client = require('../client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
      },
      isAuthenticated: false
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
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(evt) {
        var authenticationDetails, result, payload, userData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                evt.preventDefault();
                authenticationDetails = this.state.formData;

                authenticationDetails.strategy = 'local';

                _context.prev = 3;
                _context.next = 6;
                return _client2.default.authenticate(authenticationDetails);

              case 6:
                result = _context.sent;
                _context.next = 9;
                return _client2.default.passport.verifyJWT(result.accessToken);

              case 9:
                payload = _context.sent;
                _context.next = 12;
                return _client2.default.service('api/users').get(payload.userId);

              case 12:
                userData = _context.sent;

                _client2.default.set('user', userData);
                this.setState({
                  isAuthenticated: true
                });
                _context.next = 20;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context['catch'](3);

                this.setState({
                  isAuthenticated: false,
                  error: _context.t0
                });

              case 20:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 17]]);
      }));

      function loginAction(_x) {
        return _ref.apply(this, arguments);
      }

      return loginAction;
    }()
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
        }),
        this.state.isAuthenticated ? _react2.default.createElement(_reactRouterDom.Redirect, { to: '/dashboard' }) : undefined
      );
    }
  }]);

  return LoginSmartComponent;
}(_react2.default.Component);

exports.default = LoginSmartComponent;