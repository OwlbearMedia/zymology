// Module dependencies.
var application_root = __dirname,
    express = require('express'), //Web framework
    path = require('path'), //Utilities for dealing with file paths
    api = require('./api');

//Create server
var app = express();

// Configure server
app.configure(function() {
  //parses request body and populates request.body
  app.use(express.bodyParser());

  //checks request.body for HTTP method overrides
  app.use(express.methodOverride());

  //perform route lookup based on url and HTTP method
  app.use(app.router);

  //Where to serve static content
  app.use(express.static(path.join(application_root, 'site')));

  //Show all errors in development
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

// Routes
app.get('/api', function(request, response) {
  response.send('Zymology Enhancement Suite API is running.');
});

// Routes
app.get('/api/errors', function(request, response) {
  response.sendfile('site/errors.html');
});

app.get('/api/:noun', function(request, response) {
  api.getResource(request, function(result, statusCode) {
    if(statusCode) {
      response.status(statusCode);
    }
    response.send(result);
  });
});

app.get('/api/:noun/:id', function(request, response) {
  api.getResource(request, function(result, statusCode) {
    if(statusCode) {
      response.status(statusCode);
    }
    response.send(result);
  });
});

app.post('/api/:noun', function(request, response) {
  api.saveResource(request, function(result, statusCode) {
    if(statusCode) {
      response.status(statusCode);
    }
    response.send(result);
  });
});

app.delete('/api/:noun/:id', function(request, response) {
  api.deleteResource(request, function(result, statusCode) {
    if(statusCode) {
      response.status(statusCode);
    }
    response.send(result);
  });
});

app.put('/api/:noun/:id', function(request, response) {
  api.updateResource(request, function(result, statusCode) {
    if(statusCode) {
      response.status(statusCode);
    }
    response.send(result);
  });
});

//Start server
var port = 4711;
app.listen( port, function() {
  console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});