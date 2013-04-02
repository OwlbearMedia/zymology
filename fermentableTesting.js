/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

/**
 * Application prototype.
 */
var fermentable = exports = module.exports = {};

/**
 * Initialize the server.
 *
 *   - setup default configuration
 *   - setup default middleware
 *   - setup route reflection methods
 *
 * @api private
 */
app.init = function(){
  this.cache = {};
  this.settings = {};
  this.engines = {};
  this.viewCallbacks = [];
  this.defaultConfiguration();
};


//Connect to database
mongoose.connect( 'mongodb://localhost/zymology' );

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
});

//Schemas
var Fermentable = new mongoose.Schema({
  title: String,
  author: String,
  releaseDate: Date
});

//Models
var FermentableModel = mongoose.model('Fermentable', Fermentable);