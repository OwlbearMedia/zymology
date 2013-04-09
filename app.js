// Module dependencies.
var application_root = __dirname,
    express = require('express'),
    zdm = require('./zdm'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    path = require('path'),
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
  app.use('/about', express.static(path.join(application_root, 'site')));
  app.use('/recipe', express.static(path.join(application_root, 'site')));
  app.use('/contact', express.static(path.join(application_root, 'site')));
  app.use('/login', express.static(path.join(application_root, 'site')));

  //Show all errors in development
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    zdm.users.getOne({username: username}, function(err, user) {
      if(err) {
        return done(err);
      }
      if(!user) {
        return done(null, false, {message: 'Incorrect username.'});
      }
      if(!user.validPassword(password)) {
        return done(null, false, {message: 'Incorrect password.'});
      }
      return done(null, user);
    });
  }
));

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

app.post('/users', function(request, response) {
  zdm.users.save(request.body, function(err, result) {
    if(err) {
      response.send(err);
    } else {
      response.send(201, result);
    }
  });
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