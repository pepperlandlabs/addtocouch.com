define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        YouTubePlayer = require('YouTubePlayer');

    // Override onPlayerReady to pass along event object.
    YouTubePlayer.prototype.onPlayerReady = function(evt) {
        this.fireEvent('onPlayerReady', evt);
        return this.player.addEventListener('onStateChange', this.onPlayerStateChange);
      };

    return Backbone.View.extend({
        className: 'video-js',

        currentVideo: null,

        initialize: function(options) {
            options = options || {};
            this.playlist = options.controller;

            _.bindAll(this, 'playerReady', 'playerEnd', 'playerPause');
            this.listenTo(this.playlist, 'add', this.addedVideo);
            this.listenTo(this.playlist, 'remove', this.removedVideo);
            this.currentVideo = this.playlist.getCurrentVideo();
        },

        getYoutubeVideoId: function(url) {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match&&match[2].length==11){
                return match[2];
            }else{
                return null;
            }
        },

        loadNextVideo: function() {
            this.loadVideoFromModel(this.playlist.getCurrentVideo());
        },

        loadVideoFromModel: function(model) {
            if (!model) {
                return;
            }

            var id = this.getYoutubeVideoId(_.first(model.get('urls')).expanded_url);
            this.loadVideo(model, id);
        },

        addedVideo: function(model) {
            if (this.currentVideo !== this.playlist.getCurrentVideo()) {
                this.loadVideoFromModel(model);
            }
        },

        removedVideo: function(model) {
            this.trigger('video:removed', model.get('id'))
        },

        playerReady: function(event) {
            this._ytplayer = event.target;
            this._ytplayer.setVolume(100);
            this._ytplayer.playVideo();
        },

        playerEnd: function() {
            this.trigger('end');
            this.playlist.remove(this.currentVideo);
            this.currentVideo = null;
            this.loadNextVideo();
        },

        playerPause: function() {
            this.trigger('pause');
        },

        loadVideo: function(model, id) {
            this.currentVideo = model;
            if (_.isUndefined(this._ytplayer)) {
                this.video = new YouTubePlayer(this.el, id, {height: '100%', width: '100%', showinfo: 0, controls: 0, rel: 0});
                this.video.on('onPlayerReady', this.playerReady);
                this.video.on('onEnd', this.playerEnd);
                this.video.on('onPause', this.playerPause);
            } else {
                this._ytplayer.clearVideo();
                this._ytplayer.loadVideoById(id);
            }

        },

        render: function() {
            return this;
        }
    });

});
