define(function(require) {
    'use strict';

    var Marionette = require('marionette'),
        $ = require('jquery');

    return Marionette.CompositeView.extend({

        events: {
            'click .js-queue-open': 'showPlaylist',
            'click .js-queue-close': 'hidePlaylist'
        },

        modelEvents: {
            'updateCount': 'updatePlaylistCounter'
        },

        tagName: 'section',

        itemView: require('components/playlist/queue_avatar_item_view'),

        itemViewContainer: '.js-playlist-videos',

        template: {
            type: 'handlebars',
            template: require('hb!components/playlist/queue_avatar_layout.handlebars')
        },
/*
        showPlaylist: function() {
            this.$el.find('.queue__open').fadeOut(100);

            this.$el.find('.queue').animate({
                    'right': 0,
                    'width': 400
                },
                500
            );
        },

        hidePlaylist: function() {
            var $el = this.$el;

            $el.find('.queue').animate(
                {
                    'right':'-400px',
                    'width': 0
                },
                {
                    duration: 500,
                    complete: function() {
                        $el.find('.queue__open').fadeIn(100);
                    }
                }
            );
        },
*/
        updatePlaylistCounter: function(count) {
            this.$('.js-playlist-count').text(count);
        }

    });

});
