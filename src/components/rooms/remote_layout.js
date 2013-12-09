define(function(require) {
    'use strict';

    var Marionette = require('marionette'),

        layoutTemplate = require('hb!components/rooms/remote_layout.handlebars');

    return Marionette.Layout.extend({

        className: 'viewer',

        tagName: 'section',

        regions: {
            header: '.js-header',
            playlist: '.js-playlist',
            footer: '.js-footer'
        },

        render: function() {
            this.$el.empty().append(layoutTemplate());

            return this;
        }

    });

});
