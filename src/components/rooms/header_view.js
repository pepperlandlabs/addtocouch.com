define(function(require) {
    'use strict';

    var Backbone = require('backbone'),

        headerTemplate = require('hb!components/rooms/header_template.handlebars');

    return Backbone.View.extend({

        render: function() {
            this.$el.empty().append(headerTemplate(this.model.toJSON()));

            return this;
        }

    });

});
