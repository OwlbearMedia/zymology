// Module dependencies.
var mongoose = require('mongoose'),
    crypto = require('crypto'),
    shortID = require('shortid');

function Users() {}

function hashify(data) {
  var shasum = crypto.createHash('sha256');
  shasum.update(data);
  return shasum.digest('hex');
}

// Schema.
var UsersSchema = new mongoose.Schema({
  id: String,
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    set: hashify
  }
});

UsersSchema.methods.validPassword = function(password) {
  if(hashify(password) === this.password) {
    return true;
  } else {
    return false;
  }
};

UsersSchema.pre('save', function(next) {
  if (!this.id) {
    this.id = shortID.generate();
  }
  next();
});
Users.prototype.schema = UsersSchema;

// Model.
var UsersModel = mongoose.model('UsersModel', UsersSchema);
Users.prototype.model = UsersModel;

// Save.
Users.prototype.save = function(object, callback) {
  var temp = new this.model(object);
  temp.save(function(error, temp) {
    callback(error, temp);
  });
};

// Get Collection.
Users.prototype.get = function(conditions, callback) {
  var temp = this.model.find(conditions, function(error, docs) {
    callback(error, docs);
  });
};

// Get One.
Users.prototype.getOne = function(conditions, callback) {
  var temp = this.model.findOne(conditions, function(error, docs) {
    callback(error, docs);
  });
};

// Update.
Users.prototype.update = function(conditions, update, callback) {
  this.model.update(conditions, update, function(error, numberAffected, rawResponse) {
    callback(error, numberAffected + ' document(s) updated.');
  });
};

// Remove.
Users.prototype.remove = function(conditions, callback) {
  var temp = this.model.find(conditions);
  temp.remove(function(error) {
    callback(error, temp);
  });
};

var users = module.exports = exports = new Users();