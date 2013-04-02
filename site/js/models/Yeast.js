define([
  'underscore',
  'backbone'
], function(_, backbone) {
  var Yeast = Backbone.Model.extend({
    defaults: {
      strain: 'None',
      number: 'None',
      type: 'ale',
      form: 'liquid',
      manufacturer: 'None',
      flocculation: 'High',
      attenuation: 0.75,
      attenuationRange: {
        'high': 0.77,
        'low': 0.73
      },
      temperatureRange: {
        'high': 77,
        'low': 65
      },
      quantity: 1,
      cells: 100,
      alcoholTolerance: 12,
      description: 'None'
    },

    initialize: function() {
      _.bindAll(this, 'attenuationMean');

      this.attenuationMean();

      this.on({
        'change:attenuationRange': this.attenuationMean
      });
    },

    attenuationMean: function() {
      this.set('attenuation', (this.get('attenuationRange').high + this.get('attenuationRange').low) / 2);
    }
  });
  return Yeast;
});
