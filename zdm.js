// Module dependencies.
var mongoose = require('mongoose'),
    fermentables = require('./fermentables');

function ZDM() {}

//Connect to database
mongoose.connect('mongodb://localhost/zymology');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

ZDM.prototype.connection = mongoose.connection;

// Models
ZDM.prototype.fermentables = fermentables;

var zdm = module.exports = exports = new ZDM();