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
                //youtube_id = this.attributes.urls[i].expanded_url.split("youtube.com/watch?v=")[1];
                youtube_id = this.getYoutubeVideoId(this.attributes.urls[i].expanded_url);
                this.attributes.youtube_id = youtube_id;
            }

            this.set('youtube_id', youtube_id);
            this.getDataFromYoutube();
        },

        getYoutubeVideoId: function(url) {
            console.log("Extracting from: " + url);
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match&&match[2].length==11){
                return match[2];
            }else{
                return null;
            }
        },

        getDataFromYoutube: function() {
            var self = this,
                youtube_url = 'https://gdata.youtube.com/feeds/api/videos/' + this.get('youtube_id') + '?v=2&alt=jsonc',
                youtubeDataPromise;

            if (this.get('youtube_id') !== null) {
                youtubeDataPromise = $.getJSON(youtube_url);

                console.log("Loading youtube metadata for: " + youtube_url);

                youtubeDataPromise.done(function(video) {
                    self.set('title', video.data.title);
                });
            }
        }

    });

});
