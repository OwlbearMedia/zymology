// Module dependencies.
var mongoose = require('mongoose'),
    fermentables = require('./fermentables');

function ApiError() {
  this.message = {
    'error': {}
  };
}

// Status code 400. Caused by user syntax error
ApiError.prototype.badRequest = function() {
  this.message.error = {
    'status-code': 400,
    'link': 'http://127.0.0.1:4711/api/errors#400',
    'message': 'Most likely this is a syntax error. Check your URL and make sure it is correct for the resource you are accessing and the action you are performing.'
  };
  return this.message;
};

// Status code 404. Resource not found.
ApiError.prototype.notFound = function() {
  this.message.error = {
    'status-code': 404,
    'link': 'http://127.0.0.1:4711/api/errors#404',
    'message': 'The resouce being requested doesn\'t exist. Most likely the ID is incorrect, or if you\'re sure it\'s correct, maybe it has been deleted. Check your URL and make sure it is correct for the resource you are accessing and the action you are performing.'
  };
  return this.message;
};

var apiError = module.exports = exports = new ApiError();