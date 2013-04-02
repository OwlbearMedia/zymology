define([
  'underscore',
  'backbone',
  'text!templates/Contact.html'
], function(_, Backbone, contactTemplate) {
  var ContactView = Backbone.View.extend({
    el: $('#content'),

    tagName: 'div',

    className: 'container about',

    template: _.template(contactTemplate),

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
  return ContactView;
});
