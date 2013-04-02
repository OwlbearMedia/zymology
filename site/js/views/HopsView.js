define([
  'underscore',
  'backbone',
  'collections/Hops',
  'views/HopView',
  'text!templates/Hops.html'
], function(_, Backbone, Hops, HopView, listTemplate) {
  var HopsView = Backbone.View.extend({
    el: $('.hops'),

    tagName: 'div',

    template: _.template(listTemplate, this.hops),

    events: {
      'change select#hop': 'doAlphaAcid',
      'click button.add': 'addItem'
    },

    initialize: function(){
      var self = this;

      _.bindAll(this, 'render', 'doAlphaAcid', 'addItem', 'appendItem');

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

      _.each(this.collection.models, function(hop, key, list){
        var item = new HopView({
          model: hop
        });

         $(self.el).find('.list').append(item.render().el);
      });

      return this;
    },

    doAlphaAcid: function() {
      var alphaAcid = window.availableHops.get($(this.el).find('#hop').val()).get('alphaAcid');

      $(this.el).find('.aa').val(alphaAcid);
    },

    addItem: function(){
      var $mutator = $(this.el).find('.mutator'),
          temp = window.availableHops.get($mutator.find('#hop').val()).clone();

      temp.set({
        'quantity': $mutator.find('.quantity').val(),
        'time': $mutator.find('.time').val(),
        'form': $mutator.find('.form').val()
      });

      this.collection.add(temp);
    },

    appendItem: function(model, collection, options) {
      var $insertionPoint = $(this.el).find('.hop').eq(collection.indexOf(model)),
          item = new HopView({
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
  return HopsView;
});
