// Module dependencies.
var zdm = require('./zdm');

function API() {}

API.prototype.getResource = function(request, callback) {
  if(zdm[request.params.noun] && request.params.id) {
    zdm[request.params.noun].getOne({id: request.params.id}, function(error, result) {
      if(error) {
        callback(error);
      } else {
        callback(result);
      }
    });
  } else if(zdm[request.params.noun]) {
    zdm[request.params.noun].get(function(error, result) {
      if(error) {
        callback(error);
      } else {
        //var temp = '{"documentsLength": "'+result.length+'", "documents": '+JSON.stringify(result)+'}';
        //callback(JSON.parse(temp));
        callback(result);
      }
    });
  } else {
    callback("Oh Snap! Invalid Parameter!");
  }
};

API.prototype.saveResource = function(request, callback) {
  if(zdm[request.params.noun]) {
    zdm[request.params.noun].save(request.body, function(error, result) {
      if(error) {
        callback(error);
      } else {
        callback(result);
      }
    });
  } else {
    callback("Oh Snap! Invalid Parameter!");
  }
};

API.prototype.updateResource = function(request, callback) {
  if(zdm[request.params.noun] && request.params.id) {
    zdm[request.params.noun].update({id: request.params.id}, request.body, function(error, result) {
      if(error) {
        callback(error);
      } else {
        callback(result);
      }
    });
  } else {
    callback("Oh Snap! Invalid Parameter!");
  }
};

API.prototype.deleteResource = function(request, callback) {
  if(zdm[request.params.noun] && request.params.id) {
    zdm[request.params.noun].remove({id: request.params.id}, function(error, result) {
      if(error) {
        callback(error);
      } else {
        callback(result);
      }
    });
  } else {
    callback("Oh Snap! Invalid Parameter!");
  }
};

var api = module.exports = exports = new API();