define(function(require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Application = require('core/application'),
        Marionette = require('marionette'),

        Room = require('entities/room'),
        PlaylistCollection = require('entities/playlist_collection'),
        IndexView = require('components/rooms/index_view'),
        ViewLayout = require('components/rooms/view_layout'),
        RemoteViewLayout = require('components/rooms/remote_layout'),
        HeaderView = require('components/rooms/header_view'),
        FooterView = require('components/rooms/footer_view'),
        PlaylistView = require('components/playlist/index_view'),
        SimplePlaylistView = require('components/playlist/simple_playlist'),
        VideoPlayer = require('components/video/view'),

        roomController = Marionette.Controller.extend({

            cleanup: function() {
                if (this.currentView) {
                    this.currentView.remove();
                }

                $(Application.getInstance().request('$el')).empty();
            },

            index: function() {
                this.cleanup();

                var room = new Room(),
                    app = Application.getInstance();

                this.currentView = new IndexView({
                    model: room
                });

                $(app.request('$el')).append(
                    this.currentView.render().$el
                );

                function goToView(content) {
                    if (content) {
                        app.reqres.request('router').navigate(
                            '/room/' + room.get('hash'),
                            {
                                trigger: true
                            }
                        );
                    }
                }

                app.on('playlist:get', goToView);
                app.on('playlist:add', goToView);
            },

            remote: function(hash) {
                this.cleanup();

                var app = Application.getInstance(),
                    playlistCollection = new PlaylistCollection(),
                    room = new Room({
                        hash: hash,
                        collection: playlistCollection
                    }),
                    playlistView = new SimplePlaylistView({
                        model: room,
                        collection: playlistCollection
                    });

                app.on('playlist:remove', function(keyName) {
                    playlistCollection.removeByKeyName(keyName, {silent: true});
                });

                app.on('playlist:get', function(content) {
                    playlistCollection.add(_.toArray(content));
                });

                app.on('playlist:add', function(content) {
                    playlistCollection.add(content);
                });

                this.currentView = new RemoteViewLayout();

                $(app.request('$el')).append(
                    this.currentView.render().$el
                );

                this.currentView.playlist.show(playlistView);
            },

            view: function(hash) {
                this.cleanup();

                var app = Application.getInstance(),
                    playlistCollection = new PlaylistCollection(),
                    room = new Room({
                        hash: hash,
                        collection: playlistCollection
                    }),
                    videoPlayer = new VideoPlayer({
                        model: room,
                        controller: playlistCollection
                    }),
                    playlistView = new PlaylistView({
                        model: room,
                        collection: playlistCollection
                    });

                app.on('playlist:remove', function(keyName) {
                    playlistCollection.removeByKeyName(keyName, {silent: true});
                });

                app.on('playlist:get', function(content) {
                    playlistCollection.add(_.toArray(content));
                });

                app.on('playlist:add', function(content) {
                    playlistCollection.add(content);
                });

                videoPlayer.on('video:removed', function(id) {
                    app.trigger('video:remove', id);
                });

                this.currentView = new ViewLayout();

                $(app.request('$el')).append(
                    this.currentView.render().$el
                );

                this.currentView.header.show(new HeaderView({
                    model: room
                }));

                this.currentView.footer.show(new FooterView({
                    model: room
                }));

                this.currentView.content.show(videoPlayer);

                this.currentView.playlist.show(playlistView);
            }

        });

    return roomController;
});
