'use strict';

var path = require('path');
var favicon = require('serve-favicon');
var compress = require('compression');
var helmet = require('helmet');
var cors = require('cors');
var logger = require('winston');

var feathers = require('@feathersjs/feathers');
var configuration = require('@feathersjs/configuration');
var express = require('@feathersjs/express');
var socketio = require('@feathersjs/socketio');

var middleware = require('./middleware');
var services = require('./services');
var appHooks = require('./app.hooks');
var channels = require('./channels');

var app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder

app.use('/', express.static(path.resolve('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger: logger }));

app.hooks(appHooks);

module.exports = app;