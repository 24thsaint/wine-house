'use strict';

require('typeface-roboto');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = require('react-router-dom');

var _Login = require('./smart/Login.smart');

var _Login2 = _interopRequireDefault(_Login);

var _Error = require('./dumb/Error404');

var _Error2 = _interopRequireDefault(_Error);

var _GlobalAppBar = require('./dumb/GlobalAppBar');

var _GlobalAppBar2 = _interopRequireDefault(_GlobalAppBar);

var _core = require('@material-ui/core');

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var theme = (0, _styles.createMuiTheme)({
  palette: {
    primary: {
      light: '#ffa4a2',
      main: '#e57373',
      dark: '#af4448',
      contrastText: '#000000'
    },
    secondary: {
      light: '#ff6f60',
      main: '#e53935',
      dark: '#ab000d',
      contrastText: '#000000'
    }
  }
}); /* global document */


var Index = function Index() {
  return _react2.default.createElement(
    _styles.MuiThemeProvider,
    { theme: theme },
    _react2.default.createElement(
      _reactRouterDom.BrowserRouter,
      null,
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _core.Grid,
          { container: true, style: { flexGrow: 1 } },
          _react2.default.createElement(
            _core.Grid,
            { item: true, xs: 12 },
            _react2.default.createElement(
              _core.Grid,
              { item: true, xs: 12 },
              _react2.default.createElement(_GlobalAppBar2.default, null)
            ),
            _react2.default.createElement(
              _core.Grid,
              { item: true, xs: 12 },
              _react2.default.createElement(
                _reactRouterDom.Switch,
                null,
                _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _Login2.default }),
                _react2.default.createElement(_reactRouterDom.Route, { component: _Error2.default })
              )
            )
          )
        )
      )
    )
  );
};

_reactDom2.default.render(_react2.default.createElement(Index, null), document.getElementById('app'));