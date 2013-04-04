// Module dependencies.
var zdm = require('./zdm'),
    error = require('./error'),
    status = require('./status');

function API() {}

API.prototype.getResource = function(request, callback) {
  if(zdm[request.params.noun] && request.params.id) {
    zdm[request.params.noun].getOne({id: request.params.id}, function(err, result) {
      if(err) {
        callback(err);
      } else if(!result) {
        callback(error.notFound(), 404);
      } else {
        callback(result);
      }
    });
  } else if(zdm[request.params.noun]) {
    zdm[request.params.noun].get(function(err, result) {
      if(err) {
        callback(err);
      } else if(!result) {
        callback(error.notFound(), 404);
      } else {
        callback(result);
      }
    });
  } else {
    callback(error.badRequest(), 400);
  }
};

API.prototype.saveResource = function(request, callback) {
  if(zdm[request.params.noun]) {
    zdm[request.params.noun].save(request.body, function(err, result) {
      if(err) {
        callback(err);
      } else {
        callback(result, 201);
      }
    });
  } else {
    callback(error.badRequest(), 400);
  }
};

API.prototype.updateResource = function(request, callback) {
  if(zdm[request.params.noun] && request.params.id) {
    zdm[request.params.noun].update({id: request.params.id}, request.body, function(err, result) {
      if(err) {
        callback(err);
      } else {
        callback(result);
      }
    });
  } else {
    callback(error.badRequest(), 400);
  }
};

API.prototype.deleteResource = function(request, callback) {
  if(zdm[request.params.noun] && request.params.id) {
    zdm[request.params.noun].remove({id: request.params.id}, function(err) {
      if(err) {
        callback(err);
      } else {
        callback(status.deleted());
      }
    });
  } else {
    callback(error.badRequest(), 400);
  }
};

var api = module.exports = exports = new API();