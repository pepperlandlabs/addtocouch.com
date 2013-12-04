define(function(require) {
    'use strict';

    var Marionette = require('marionette'),
        $ = require('jquery');

    return Marionette.CompositeView.extend({

<<<<<<< HEAD
        /*events: {
            'click .js-queue-open': 'showPlaylist',
            'click .js-queue-close': 'hidePlaylist'
        },*/
=======
        events: {
            'click .js-queue-open': 'showPlaylist',
            'click .js-queue-close': 'hidePlaylist'
        },
>>>>>>> 5030e9d... Beginnings of avatar-based queue, with /remote reintegrated

        modelEvents: {
            'updateCount': 'updatePlaylistCounter'
        },

        tagName: 'section',

<<<<<<< HEAD
        itemView: require('components/playlist/queue_avatar_view'),
=======
        itemView: require('components/playlist/queue_avatar_item_view'),
>>>>>>> 5030e9d... Beginnings of avatar-based queue, with /remote reintegrated

        itemViewContainer: '.js-playlist-videos',

        template: {
            type: 'handlebars',
<<<<<<< HEAD
            template: require('hb!components/playlist/queue_layout_avatars.handlebars')
=======
            template: require('hb!components/playlist/queue_avatar_layout.handlebars')
>>>>>>> 5030e9d... Beginnings of avatar-based queue, with /remote reintegrated
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
