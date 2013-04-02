define([
  'underscore',
  'backbone',
  'models/Yeast'
], function(_, Backbone, Yeast){
  var Yeasts = Backbone.Collection.extend({
    model: Yeast
  });
  return Yeasts;
});
