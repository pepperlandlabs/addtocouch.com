define(function(require) {
    'use strict';

    var Backbone = require('backbone'),

        VideoModel = require('entities/video_model');

    return Backbone.Collection.extend({

        keyPrefix: '/playlist/',

        model: VideoModel,

        comparator: function(video) {
            return video.get('id');
        },

        removeByKeyName: function(keyName, options) {
            var id = keyName.replace(this.keyPrefix, '');

            var videoToRemove = this.find(function(v) {
                return v.get('id') === id;
            });

            if (videoToRemove) {
                this.remove(videoToRemove, options);
            }
        },

        getCurrentVideo: function() {
            return this.first();
        }
    });

});
