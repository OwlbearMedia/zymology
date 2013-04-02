define([
  'underscore',
  'backbone',
  'text!templates/Home.html'
], function(_, Backbone, homeTemplate) {
  var HomeView = Backbone.View.extend({
    el: $('#content'),

    tagName: 'div',

    className: 'container home',

    template: _.template(homeTemplate),

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
  return HomeView;
});
