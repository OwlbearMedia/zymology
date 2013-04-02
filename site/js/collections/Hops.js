define([
  'underscore',
  'backbone',
  'models/Hop'
], function(_, Backbone, Hop){
  var Hops = Backbone.Collection.extend({
    model: Hop,

    initialize: function() {
      this.on({
        'change:time': function() {
          this.sort();
          this.trigger('resort');
        }
      });
    },

    comparator: function(hop) {
      // A negative value sorts the collection in descending order
      return -(hop.get('time'));
    },
  });
  return Hops;
});
