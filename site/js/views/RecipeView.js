define([
  'underscore',
  'backbone',
  'views/FermentablesView',
  'views/HopsView',
  'views/YeastsView',
  'text!templates/Recipe.html'
], function(_, Backbone, FermentablesView, HopsView, YeastsView, recipeTemplate) {
  var RecipeView = Backbone.View.extend({
    el: $('#content'),

    tagName: 'div',

    className: 'recipe',

    template: _.template(recipeTemplate),

    events: {
      'click .delete-recipe': 'remove',
      'click .modify-recipe': 'edit',
      'click .save-recipe': 'save'
    },

    initialize: function(){
      var self = this;

      _.bindAll(this, 'render', 'unrender', 'remove', 'edit', 'save');

      this.model.on({
        'change': this.render,
        'remove': this.unrender
      });

      this.render();
    },

    render: function(){
      var fermentables = $(this.el).find('.fermentables').detach(),
          hops = $(this.el).find('.hops').detach(),
          yeasts = $(this.el).find('.yeasts').detach();

      $(this.el).html(this.template(this.model.toJSON()));

      if(!this.fermentablesView) {
        this.fermentablesView = new FermentablesView({
          collection: this.model.get('fermentables'),
          el: $('.fermentables')
        });
        this.fermentablesView.parentView = this;
      }
      else {
        $(this.el).find('.fermentables').replaceWith(fermentables);
      }

      if(!this.hopsView) {
        this.hopsView = new HopsView({
          collection: this.model.get('hops'),
          el: $('.hops')
        });
        this.hopsView.parentView = this;
      }
      else {
        $(this.el).find('.hops').replaceWith(hops);
      }

      if(!this.yeastsView) {
        this.yeastsView = new YeastsView({
          collection: this.model.get('yeasts'),
          el: $('.yeasts')
        });
        this.yeastsView.parentView = this;
      }
      else {
        $(this.el).find('.yeasts').replaceWith(yeasts);
      }

      return this;
    },

    unrender: function() {
      $(this.el).remove();
    },

    remove: function() {
      this.model.destroy();
    },

    edit: function() {
      $(this.el).find('.edit.stats').slideDown();
      $(this.el).find('.view.stats').slideUp();
    },

    save: function() {
      var self = this,
          $edit = $(this.el).find('.stats'),
          style = $edit.find('select.style').val();

      if(style) {
        style = window.availableStyles.get(style).clone();
      }
      else {
        style = this.model.get('style');
      }

      $(this.el).find('.edit.stats').slideUp(400, function() {
        self.model.set({
          'name': $edit.find('input.name').val(),
          'style': style,
          'size': $edit.find('input.size').val(),
          'time': $edit.find('input.time').val()
        });
      });
      $(this.el).find('.view.stats').slideDown();
    }
  });
  return RecipeView;
});
