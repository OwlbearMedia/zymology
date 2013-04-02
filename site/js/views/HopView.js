define([
  'underscore',
  'backbone',
  'text!templates/Hop.html'
], function(_, Backbone, hopTemplate) {
  var HopView = Backbone.View.extend({
    tagName: 'div',

    className: 'hop row-fluid',

    template: _.template(hopTemplate),

    events: {
      'click button.delete': 'remove',
      'click button.modify': 'edit',
      'click button.save': 'save'
    },

    initialize: function(){
      _.bindAll(this, 'render', 'edit', 'save', 'unrender', 'remove');

      this.model.bind('change', this.render);
      this.model.bind('remove', this.unrender);
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    edit: function() {
      $(this.el).find('.edit').slideDown();
      $(this.el).find('.view').slideUp();
    },

    save: function() {
      var self = this,
          $edit = $(this.el).find('.edit');

      $(this.el).find('.edit').slideUp();
      $(this.el).find('.view').slideDown(400, function() {
        self.model.set({
          'quantity': $edit.find('input.quantity').val(),
          'lovibond': $edit.find('input.lovibond').val(),
          'ppg': $edit.find('input.ppg').val()
        });
      });
    },

    unrender: function(){
      $(this.el).remove();
    },

    remove: function(){
      var self = this;

      $(this.el).fadeOut(400, function() {
        self.model.destroy();
      });
    }
  });
  return HopView;
});
