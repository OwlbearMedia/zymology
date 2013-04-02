define([
  'underscore',
  'backbone',
  'collections/Fermentables',
  'collections/Hops',
  'collections/Yeasts',
], function(_, Backbone, Fermentables, Hops, Yeasts) {
  var Recipe = Backbone.Model.extend({
    defaults: {
      name: 'New Recipe',
      description: 'None',
      style: {
        'name': 'Style',
        'type': 'ale'
      },
      ale: true,
      lager: false,
      size: 5,
      efficiency: 0.75,
      attenuation: 0.75,
      time: 60,
      ppg: 0,
      gravity: {
        og: 1.000,
        fg: 1.000
      }, 
      plato: {
        og: 0,
        fg: 0
      },
      ibu: 0,
      fermentables: new Fermentables(),
      hops: new Hops(),
      yeasts: new Yeasts(),
      cellCount: 0,
      cellsNeeded: 0,
      starterSize: 0,
      abv: 0,
      calories: 0,
      srm: 0,
      mcu: 0,
      color: []
    },

    initialize: function() {
      var self = this;

      _.bindAll(this, 'calcPPG', 'calcGravity', 'calcPlato', 'colorize', 'calcIBU', 'calcYeast', 'calcCells');
      
      this.get('fermentables').on({
        'add': function(model) {
          self.calcPPG(model, 'add');
          self.colorize(model, 'add');
        },
        'change:quantity change:ppg': function(model) {
          self.calcPPG(model, 'change');
          self.colorize(model, 'change');
        },
        'remove': function(model) {
          self.calcPPG(model, 'remove');
          self.colorize(model, 'remove');
        }
      });
      this.get('hops').on({
        'add': function(model) {
          self.calcIBU(model, 'add');
        },
        'change:quantity change:time change:aa': function(model) {
          self.calcIBU(model, 'change');
        },
        'remove': function(model) {
          self.calcIBU(model, 'remove');
        }
      });
      this.get('yeasts').on({
        'add': function(model) {
          self.calcYeast(model, 'add');
        },
        'change:quantity change:cells': function(model) {
          self.calcYeast(model, 'change');
        },
        'remove': function(model) {
          self.calcYeast(model, 'remove');
        }
      });
      this.on({
        'change:ppg change:efficiency change:attenuation': function(model) {
          this.calcGravity();
          this.set('ibu', 0);
          _.each(this.get('hops').models, function(hop, key, list) {
            self.calcIBU(hop, 'add');
          });
        },
        'change:gravity': this.calcPlato,
        'change:plato': this.calcCells,
        'change:size': function(model) {
          this.calcPPG(model, 'size');
          this.colorize(model, 'size');
          this.set('ibu', 0);
          _.each(this.get('hops').models, function(hop, key, list) {
            self.calcIBU(hop, 'add');
          });
        },
        'change:style': this.calcCells
      });
    },

    calcPPG: function(model, action) {
      var ppg;

      switch(action) {
        case 'add':
          ppg = this.get('ppg') + (model.get('quantity') * model.get('ppg') / this.get('size'));
          break;
        case 'remove':
          ppg = this.get('ppg') - (model.get('quantity') * model.get('ppg') / this.get('size'));
          break;
        case 'change':
          var prevPPG = (model.previousAttributes().quantity * model.previousAttributes().ppg / this.get('size')); 
          ppg = this.get('ppg') - prevPPG + (model.get('quantity') * model.get('ppg') / this.get('size'));
          break;
        case 'size':
          ppg = this.get('ppg') * (model.previousAttributes().size / this.get('size'));
          break;
      }

      this.set({'ppg': ppg});
    },

    calcGravity: function() {
      var gravity = {};

      gravity.og = ((this.get('ppg') * this.get('efficiency')) * 0.001) + 1;
      gravity.fg = (this.get('ppg') * this.get('efficiency')) * this.get('attenuation');
      gravity.fg = (((this.get('ppg') * this.get('efficiency')) - gravity.fg) * 0.001) + 1;

      this.set('gravity', gravity);
    },

    calcPlato: function() {
      var plato = {},
          og = parseFloat(this.get('gravity').og),
          fg = parseFloat(this.get('gravity').fg);

      plato.og = (463 - 205 * og) * (og - 1);
      plato.fg = (463 - 205 * fg) * (fg - 1);

      this.set('plato', plato);
    },

    colorize: function(model, action) {
      var mcu, srm;

      switch(action) {
        case 'add':
          mcu = this.get('mcu') + (model.get('quantity') * model.get('lovibond') / this.get('size'));
          break;
        case 'remove':
          mcu = this.get('mcu') - (model.get('quantity') * model.get('lovibond') / this.get('size'));
          break;
        case 'change':
          var prevMCU = (model.previousAttributes().quantity * model.previousAttributes().lovibond / this.get('size')); 
          mcu = this.get('mcu') - prevMCU + (model.get('quantity') * model.get('lovibond') / this.get('size'));
          break;
        case 'size':
          mcu = this.get('mcu') * (model.previousAttributes().size / this.get('size'));
          break;
      }

      srm = 1.4922 * Math.pow(mcu, 0.6859);
      
      this.set({
        'mcu': mcu,
        'srm': srm
      });
    },

    calcIBU: function(model, action) {
      var totalIbu = this.get('ibu'),
          aau = model.get('alphaAcid') * model.get('quantity'),
          time = model.get('time'),
          size = this.get('size'),
          og = this.get('gravity').og,
          tinseth = (1.65 * Math.pow(0.000125, (og - 1))) * ((1 - Math.pow(Math.E, (-0.04 * time))) / 4.15),
          ibu = aau * tinseth * 74.89 / size;

      switch(action) {
        case 'add':
          totalIbu = totalIbu + ibu;
          break;
        case 'remove':
          totalIbu = totalIbu - ibu;
          break;
        case 'change':
          var prevIBU = model.previousAttributes().ibu;
          totalIbu = totalIbu - prevIBU + ibu;
          break;
      }

      model.set('ibu', ibu);
      this.set({'ibu': totalIbu});
    },

    calcYeast: function(model, action) {
      var cellCount = 0;

      switch(action) {
        case 'add':
          cellCount = this.get('cellCount') + model.get('cells');
          break;
        case 'remove':
          cellCount = this.get('cellCount') - model.get('cells');
          break;
        case 'change':
          var prevCount = (model.previousAttributes().cells); 
          cellCount = this.get('cellCount') - prevCount + model.get('cells');
          break;
      }

      this.set({'cellCount': cellCount});
    },

    calcCells: function() {
      var plato = this.get('plato').og,
          ml = this.get('size') * 3785.41178,
          cells = 0.00075 * ml * plato;

      switch(this.get('yeasts').type) {
        case 'lager':
          cells = 0.00100 * ml * plato;
          break;
        case 'hybrid':
          cells = 0.00150 * ml * plato;
          break;
      }

      this.set('cellsNeeded', cells);
    }
  });
  return Recipe;
});