// Module dependencies.
var mongoose = require('mongoose'),
    fermentables = require('./fermentables');
    users = require('./users');

function ZDM() {}

//Connect to database
mongoose.connect('mongodb://localhost/zymology');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

ZDM.prototype.connection = mongoose.connection;

// Models
ZDM.prototype.fermentables = fermentables;
ZDM.prototype.users = users;

var zdm = module.exports = exports = new ZDM();