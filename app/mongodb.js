'use strict';

var url = require('url');
var MongoClient = require('mongodb').MongoClient;

module.exports = function (app) {
  var config = app.get('mongodb');
  var dbName = url.parse(config).path.substring(1);
  var promise = MongoClient.connect(config).then(function (client) {
    // For mongodb <= 2.2
    if (client.collection) {
      return client;
    }

    return client.db(dbName);
  });

  app.set('mongoClient', promise);
};