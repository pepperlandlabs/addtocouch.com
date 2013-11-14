define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        $ = require('jquery');

    return Backbone.Model.extend({

        defaults: {
            title: ''
        },

        initialize: function(options) {
            var youtube_id,
                i;

            for (i in this.attributes.urls) {
                youtube_id = this.attributes.urls[i].expanded_url.split("youtube.com/watch?v=")[1];
                this.attributes.youtube_id = youtube_id;
            }

            this.getDataFromYoutube();
        },

        getDataFromYoutube: function() {
            var self = this,
                youtubeDataPromise = $.getJSON('https://gdata.youtube.com/feeds/api/videos/' + this.get('youtube_id') + '?v=2&alt=jsonc');

            youtubeDataPromise.done(function(video) {
                self.set('title', video.data.title);
            });
        }

    });

});
