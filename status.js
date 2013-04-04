// Module dependencies.
var mongoose = require('mongoose'),
    fermentables = require('./fermentables');

function ApiStatus() {
  this.message = {
    'status': {}
  };
}

// Returned when a resouces is deleted
ApiStatus.prototype.deleted = function() {
  this.message.status = {
    'status-code': 200,
    'message': 'The selected resouce was deleted.'
  };
  return this.message;
};

var apiStatus = module.exports = exports = new ApiStatus();