define([
  'underscore',
  'backbone'
], function(_, backbone) {
  var Hop = Backbone.Model.extend({
    defaults: {
      cultivar: 'None',
      form: 'Pellet',
      quantity: 1,
      time: 60,
      use: 'Boil',
      alphaAcid: 0,
      betaAcid: 0,
      ibu: 0,
      description: 'None'
    }
  });
  return Hop;
});
