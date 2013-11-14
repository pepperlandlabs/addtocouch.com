define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        room = require('core/goinstant'),

        firstWords = require('data/hash_first_words'),
        secondWords = require('data/hash_second_words');

    return Backbone.Model.extend({

        initialize: function(options) {
            options = options || {};

            function randomItem(arr) {
                return arr[Math.floor((Math.random()*arr.length))];
            }

            if (!options.hash) {
                options.hash = randomItem(firstWords) + randomItem(secondWords);
            }

            this.set('hash', options.hash);

            if (options.collection) {
                this.set('playlistCount', options.collection.length);
                this.listenTo(options.collection, 'add', this.updateCount);
                this.listenTo(options.collection, 'remove', this.updateCount);
            }

            room.initialize(options.hash);

            this.options = options;
        },

        updateCount: function() {
            this.set('playlistCount', this.options.collection.length);
            this.trigger('updateCount', this.get('playlistCount'));
        }

    });
});
