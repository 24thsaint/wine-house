'use strict';

require('typeface-roboto');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = require('react-router-dom');

var _Login = require('./smart/Login.smart');

var _Login2 = _interopRequireDefault(_Login);

var _Registration = require('./smart/Registration.smart');

var _Registration2 = _interopRequireDefault(_Registration);

var _Error = require('./dumb/Error404');

var _Error2 = _interopRequireDefault(_Error);

var _GlobalAppBar = require('./dumb/GlobalAppBar');

var _GlobalAppBar2 = _interopRequireDefault(_GlobalAppBar);

var _core = require('@material-ui/core');

var _styles = require('@material-ui/core/styles');

var _WineRegistration = require('./smart/WineRegistration.smart');

var _WineRegistration2 = _interopRequireDefault(_WineRegistration);

require('./client');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global document */
var theme = (0, _styles.createMuiTheme)({
  palette: {
    primary: {
      light: '#d4996a',
      main: '#aa6b39',
      dark: '#552600',
      contrastText: '#ffd0aa'
    },
    secondary: {
      light: '#41817f',
      main: '#226765',
      dark: '#003432',
      contrastText: '#679b99'
    }
  }
});

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
                _react2.default.createElement(_reactRouterDom.Route, { path: '/register', component: _Registration2.default }),
                _react2.default.createElement(_reactRouterDom.Route, { path: '/wine-registration', component: _WineRegistration2.default }),
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