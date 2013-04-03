define([
  'underscore',
  'backbone',
  'models/BJCPStyle'
], function(_, Backbone, BJCPStyle){
  var BJCPStyles = Backbone.Collection.extend({
    model: BJCPStyle
  });
  return BJCPStyles;
});
