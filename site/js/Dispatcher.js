define([
  'underscore',
  'backbone',
  'views/HomeView',
  'models/Recipe',
  'views/RecipeView',
  'views/AboutView',
  'views/ContactView'
], function(_, Backbone, HomeView, Recipe, RecipeView, AboutView, ContactView) {
  var Dispatcher = Backbone.Router.extend({

    routes: {
      '': 'home',
      'recipe': 'recipe',
      'about': 'about',
      'contact': 'contact'
    },

    $nav: $('ul.nav'),

    initialize: function() {
      var self = this;

      // Prevent default on internal links and updates the URL via Router.navigate()
      $(document).on('click', 'a:not([data-bypass])', function(evt) {
        var href = $(this).attr('href');

        if(href.indexOf('//') < 0) {
          evt.preventDefault();

          self.navigate(href, true);
        }
      });
    },

    home: function() {
      this.$nav.find('li').removeClass('active');
      this.$nav.find('.home').addClass('active');

      var home = new HomeView();
    },

    recipe: function() {
      this.$nav.find('li').removeClass('active');
      this.$nav.find('.recipe').addClass('active');

      var recipe = new Recipe({
        availableFermentables: window.availableFermentables
      });

      var start = new RecipeView({
        model: recipe
      });
    },

    about: function() {
      this.$nav.find('li').removeClass('active');
      this.$nav.find('.about').addClass('active');

      var about = new AboutView();
    },

    contact: function() {
      this.$nav.find('li').removeClass('active');
      this.$nav.find('.contact').addClass('active');

      var contact = new ContactView();
    }
  });
  return Dispatcher;
});


