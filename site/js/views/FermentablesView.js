define([
  'underscore',
  'backbone',
  'collections/Fermentables',
  'views/FermentableView',
  'text!templates/Fermentables.html'
], function(_, Backbone, Fermentables, FermentableView, listTemplate) {
  var FermentablesView = Backbone.View.extend({
    el: $('.fermentables'),

    tagName: 'div',
    
    template: _.template(listTemplate, this.fermentables),
    
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
      
      _.each(this.collection.models, function(fermentable, key, list){
        var item = new FermentableView({
          model: fermentable
        });
        
         $(self.el).find('.list').append(item.render().el);
      });
      
      return this;
    },
    
    addItem: function(){
      var size = $(this.el).find('.mutator .quantity').val(),
          cid = $(this.el).find('#cid').val(),
          temp = window.availableFermentables.get(cid).clone();
    
      temp.set('quantity', size);
      
      this.collection.add(temp);
    },
    
    appendItem: function(model, collection, options) {
      var $insertionPoint = $(this.el).find('.fermentable').eq(collection.indexOf(model)),
          item = new FermentableView({
            model: model
          });

      // If the new model is not at the end of the collection there will be an insertion point 
      if($insertionPoint.length) {
        $(item.el).hide();
        $insertionPoint.before(item.render().el);
        $(item.el).fadeIn();
      }
      // If there is no insertion point it is at the end of the collection, so just append it to the list 
      else {
        $(item.el).hide();
        $(this.el).find('.list').append(item.render().el);
        $(item.el).fadeIn();
      }
    }
  });
  return FermentablesView;
});
