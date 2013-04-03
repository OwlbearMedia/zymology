require.config({
  paths: {
    jquery: 'libs/jquery/jquery',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone',
    bootstrap: 'libs/bootstrap/bootstrap.min',
    text: 'libs/require/text',
    models: 'models',
    views: 'views'
  },
  shim: {
    // Make sure jQuery and Underscore are loaded before Backbone.
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    // And Backbone loads before Bootstrap
    'bootstrap': {
      deps: ['backbone'],
      exports: 'Bootstrap'
    }
  }
});

// Start the main app logic.
require([
  'jquery',
  'underscore',
  'backbone',
  'text',
  'bootstrap',
  'Dispatcher',
  'collections/Fermentables',
  'collections/Hops',
  'collections/Yeasts',
  'collections/BJCPStyles'
], function($, _, Backbone, text, Bootstrap, Dispatcher, Fermentables, Hops, Yeasts, BJCPStyles) {

    window.availableFermentables = new Fermentables();
    window.availableFermentables.url = '/api/fermentables';
    window.availableFermentables.fetch();

    window.availableHops = new Hops([
      {cultivar: 'Cascade', alphaAcid: 6.3},
      {cultivar: 'Simcoe', alphaAcid: 12.6}
    ]);

    window.availableYeasts = new Yeasts([
      {strain: 'American Ale', manufacturer: 'Wyeast', number: '1056'},
      {strain: 'French Saison', manufacturer: 'Wyeast', number: '3711', attenuationRange: {'high': 0.83,'low': 0.77}}
    ]);

    window.availableStyles = new BJCPStyles([
      {number: '14A', name: 'English IPA'},
      {number: '14B', name: 'American IPA'},
      {number: '14C', name: 'Imperial IPA'}
    ]);

    var dispatcher = new Dispatcher();

    Backbone.history.start({pushState: true});
  }
);
