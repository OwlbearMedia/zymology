define([
  'underscore',
  'backbone',
  'text!templates/About.html'
], function(_, Backbone, aboutTemplate) {
  var AboutView = Backbone.View.extend({
    el: $('#content'),

    tagName: 'div',

    className: 'container about',

    template: _.template(aboutTemplate),

    initialize: function(){
      _.bindAll(this, 'render', 'unrender');

      this.render();
    },

    render: function(){
      $(this.el).html(this.template());
    },

    unrender: function() {
      $(this.el).remove();
    }
  });
  return AboutView;
});
