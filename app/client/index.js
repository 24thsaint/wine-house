'use strict';

require('typeface-roboto');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = require('react-router-dom');

var _HomeView = require('./dumb/HomeView');

var _HomeView2 = _interopRequireDefault(_HomeView);

var _Error = require('./dumb/Error404');

var _Error2 = _interopRequireDefault(_Error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global document */
var Index = function Index() {
  return _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    null,
    _react2.default.createElement(
      _reactRouterDom.Switch,
      null,
      _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _HomeView2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { component: _Error2.default })
    )
  );
};

_reactDom2.default.render(_react2.default.createElement(Index, null), document.getElementById('app'));