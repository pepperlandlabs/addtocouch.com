define(function(require) {
    'use strict';

    var Marionette = require('marionette'),

        layoutTemplate = require('hb!components/rooms/view_layout.handlebars');

    return Marionette.Layout.extend({

        className: 'viewer',

        tagName: 'section',

        regions: {
            header: '.js-header',
            playlist: '.js-playlist',
            content: '.js-video'
        },

        render: function() {
            this.$el.empty().append(layoutTemplate());

            return this;
        }

    });

});
