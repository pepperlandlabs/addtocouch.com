define(function(require) {
    'use strict';

    var Backbone = require('backbone'),

        template = require('hb!components/rooms/index.handlebars');

    return Backbone.View.extend({

        render: function() {
            this.$el.empty().append(template(this.model.toJSON()));
            return this;
        }

    });

});
