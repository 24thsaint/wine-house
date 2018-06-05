'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AppBar = require('@material-ui/core/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _Toolbar = require('@material-ui/core/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Menu = require('@material-ui/icons/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GlobalAppBar = function (_React$Component) {
  _inherits(GlobalAppBar, _React$Component);

  function GlobalAppBar() {
    _classCallCheck(this, GlobalAppBar);

    return _possibleConstructorReturn(this, (GlobalAppBar.__proto__ || Object.getPrototypeOf(GlobalAppBar)).apply(this, arguments));
  }

  _createClass(GlobalAppBar, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _AppBar2.default,
          { position: 'static' },
          _react2.default.createElement(
            _Toolbar2.default,
            null,
            _react2.default.createElement(
              _IconButton2.default,
              { color: 'inherit', 'aria-label': 'Menu' },
              _react2.default.createElement(_Menu2.default, null)
            ),
            _react2.default.createElement(
              _Typography2.default,
              { variant: 'title', color: 'inherit' },
              'Wine House'
            ),
            _react2.default.createElement(
              _Button2.default,
              { color: 'inherit' },
              'Menu'
            )
          )
        )
      );
    }
  }]);

  return GlobalAppBar;
}(_react2.default.Component);

exports.default = GlobalAppBar;