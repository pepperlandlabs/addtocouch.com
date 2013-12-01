define(function(require) {
    'use strict';

    var Backbone = require('backbone'),

        footerTemplate = require('hb!components/rooms/footer_template.handlebars');

    return Backbone.View.extend({

        render: function() {
            this.$el.empty().append(footerTemplate(this.model.toJSON()));

            return this;
        }

    });

});
