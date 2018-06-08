'use strict';

var authenticate = require('@feathersjs/authentication').hooks.authenticate;

var _require$hooks = require('@feathersjs/authentication-local').hooks,
    hashPassword = _require$hooks.hashPassword,
    protect = _require$hooks.protect;

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [hashPassword()],
    update: [hashPassword(), authenticate('jwt')],
    patch: [hashPassword(), authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
    // Make sure the password field is never sent to the client
    // Always must be the last hook
    protect('password')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};