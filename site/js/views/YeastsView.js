define([
  'underscore',
  'backbone',
  'collections/Yeasts',
  'views/YeastView',
  'text!templates/Yeasts.html'
], function(_, Backbone, Yeasts, YeastView, listTemplate) {
  var YeastsView = Backbone.View.extend({
    el: $('.hops'),

    tagName: 'div',
    
    template: _.template(listTemplate, this.hops),
    
    events: {
      'click button.add': 'addItem'
    },
    
    initialize: function(){
      var self = this;
      
      _.bindAll(this, 'render', 'addItem', 'appendItem');

      this.collection.on({
        'add': function(model, collection, options) {
          self.appendItem(model, collection, options);
        }
      });

      this.render();
    },

    render: function(){
      var self = this;
      
      $(this.el).html(this.template(this.collection));
      
      _.each(this.collection.models, function(yeast, key, list){
        var item = new YeastView({
          model: yeast
        });
        
         $(self.el).find('.list').append(item.render().el);
      });
      
      return this;
    },
    
    addItem: function(){
      var $mutator = $(this.el).find('.mutator'),
          temp = window.availableYeasts.get($mutator.find('#yeast').val()).clone();
    
      temp.set({
        'quantity': $mutator.find('.quantity').val()
      });
      
      this.collection.add(temp);
    },
    
    appendItem: function(model, collection, options) {
      var item = new YeastView({
            model: model
          });

      $(item.el).hide();
      $(this.el).find('.list').append(item.render().el);
      $(item.el).fadeIn();
    }
  });
  return YeastsView;
});
