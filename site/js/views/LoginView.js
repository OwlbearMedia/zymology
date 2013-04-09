define([
  'underscore',
  'backbone',
  'text!templates/Login.html'
], function(_, Backbone, loginTemplate) {
  var LoginView = Backbone.View.extend({
    el: $('#content'),

    tagName: 'div',

    className: 'container about',

    template: _.template(loginTemplate),

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
  return LoginView;
});
