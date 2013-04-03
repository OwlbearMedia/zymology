define([
  'underscore',
  'backbone'
], function(_, backbone) {
  var BJCPStyle = Backbone.Model.extend({
    defaults: {
      number: '',
      name: 'None'
    }
  });
  return BJCPStyle;
});