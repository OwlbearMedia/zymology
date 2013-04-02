define([
  'underscore',
  'backbone',
  'models/Fermentable'
], function(_, Backbone, Fermentable){
  var Fermentables = Backbone.Collection.extend({
    model: Fermentable,

    total: 0,
    
    initialize: function() {
      var self = this;

      _.bindAll(this, 'calcPercentages');
      // Whenever the quantity of one of the fermentables is changed
      // the collection is resorted in decending order via comparator
      this.on({
        'change:quantity': function(model, quantity) {
          this.sort();
          this.trigger('resort');
          this.total = this.total - parseFloat(model.previousAttributes().quantity) + parseFloat(quantity);
          _.each(this.models, function(fermentable, key, list) {
            self.calcPercentages(fermentable);
          });
        },
        'add': function(model, collection, options) {
          this.total = this.total + model.get('quantity');
          _.each(this.models, function(fermentable, key, list) {
            self.calcPercentages(fermentable);
          });
        },
        'remove': function(model, collection, options) {
          this.total = this.total - model.get('quantity');
          _.each(this.models, function(fermentable, key, list) {
            self.calcPercentages(fermentable);
          });
        }
      });
    },

    comparator: function(fermentable) {
      // A negative value sorts the collection in descending order
      return -(fermentable.get('quantity'));
    },

    calcPercentages: function(model, action, quantity) {
      model.set('percentage', (model.get('quantity') / this.total * 100));
    }
  });
  return Fermentables;
});
