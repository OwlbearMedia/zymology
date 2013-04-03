// Module dependencies.
var mongoose = require('mongoose'),
    shortID = require('shortid');

function Fermentables() {}

// Schema.
var FermentableSchema = new mongoose.Schema({
  id: String,
  name: String,
  manufacturer: String,
  origin: String,
  lovibond: Number,
  ppg: Number,
  quantity: Number,
  percentage: Number,
  description: String
});
FermentableSchema.pre('save', function(next) {
  if (!this.id) {
    this.id = shortID.generate();
  }
  next();
});
Fermentables.prototype.schema = FermentableSchema;

// Model.
var FermentableModel = mongoose.model('FermentableModel', FermentableSchema);
Fermentables.prototype.model = FermentableModel;

// Save.
Fermentables.prototype.save = function(object, callback) {
  var temp = new this.model(object);
  temp.save(function(error, temp) {
    callback(error, temp);
  });
};

// Get Collection.
Fermentables.prototype.get = function(conditions, callback) {
  var temp = this.model.find(conditions, function(error, docs) {
    callback(error, docs);
  });
};

// Get One.
Fermentables.prototype.getOne = function(conditions, callback) {
  var temp = this.model.findOne(conditions, function(error, docs) {
    callback(error, docs);
  });
};

// Update.
Fermentables.prototype.update = function(conditions, update, callback) {
  this.model.update(conditions, update, function(error, numberAffected, rawResponse) {
    callback(error, numberAffected + ' document(s) updated.');
  });
};

// Remove.
Fermentables.prototype.remove = function(conditions, callback) {
  var temp = this.model.find(conditions);
  temp.remove(function(error) {
    callback(error, temp);
  });
};

var fermentables = module.exports = exports = new Fermentables();