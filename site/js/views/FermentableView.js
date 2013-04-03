define([
  'underscore',
  'backbone',
  'text!templates/Fermentable.html'
], function(_, Backbone, fermentableTemplate) {
  var FermentableView = Backbone.View.extend({
    tagName: 'div',

    className: 'fermentable row-fluid',

    template: _.template(fermentableTemplate),

    events: {
      'click .delete': 'remove',
      'click .modify': 'edit',
      'click .save': 'save'
    },

    initialize: function(){
      _.bindAll(this, 'render', 'edit', 'save', 'unrender', 'remove');

      this.model.bind('change', this.render);
      this.model.bind('remove', this.unrender);
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      $(this.el).find('.title').tooltip({'html': true, 'placement': 'right'});
      return this;
    },

    edit: function() {
      console.log($(this.el).find('.edit'));
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
  return FermentableView;
});
