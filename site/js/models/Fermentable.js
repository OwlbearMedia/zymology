define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var Fermentable = Backbone.Model.extend({
    defaults: {
      name: 'None',
      manufacturer: 'None',
      origin: 'USA',
      lovibond: 0,
      ppg: 0,
      quantity: 1,
      percentage: 100,
      description: 'None',
    },
    
    get: function(attr) {
      if(attr === 'quantity' || attr === 'ppg') {
        return parseFloat(this.attributes[attr]);
      }
      else {
        return this.attributes[attr];
      }
    }
    
  });
  return Fermentable;
});
