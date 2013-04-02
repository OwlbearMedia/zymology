var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

FermentableProvider = function(host, port) {
  this.db= new Db('node-mongo-blog', new Server(host, port, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};


FermentableProvider.prototype.getCollection= function(callback) {
  this.db.collection('fermentables', function(error, fermentable_collection) {
    if(error) {
      callback(error);
    }
    else {
      callback(null, fermentable_collection);
    }
  });
};

FermentableProvider.prototype.findAll = function(callback) {
  this.getCollection(function(error, fermentable_collection) {
    if(error) {
      callback(error);
    }
    else {
      fermentable_collection.find().toArray(function(error, results) {
        if(error) {
          callback(error);
        }
        else {
          callback(null, results);
        }
      });
    }
  });
};


FermentableProvider.prototype.findById = function(id, callback) {
  this.getCollection(function(error, fermentable_collection) {
    if(error) {
      callback(error);
    }
    else {
      fermentable_collection.findOne({_id: fermentable_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
        if(error) {
          callback(error);
        }
        else {
          callback(null, result);
        }
      });
    }
  });
};

FermentableProvider.prototype.save = function(fermentables, callback) {
  this.getCollection(function(error, fermentable_collection) {
    if(error) {
      callback(error);
    }
    else {
      if(typeof(fermentables.length) === undefined) {
        fermentables = [fermentables];
      }

      for(var i = 0, l = fermentables.length; i < l; i++) {
        fermentable = fermentables[i];
        fermentable.created_at = new Date();
        if(fermentable.comments === undefined) {
          fermentable.comments = [];
        }
        for(var j = 0, l = fermentable.comments.length; j < l; j++) {
          fermentable.comments[j].created_at = new Date();
        }
      }

      fermentable_collection.insert(fermentables, function() {
        callback(null, fermentables);
      });
    }
  });
};

exports.FermentableProvider = FermentableProvider;