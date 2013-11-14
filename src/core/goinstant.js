define([
    'core/application',
    'https://cdn.goinstant.net/v1/platform.min.js'
], function(Application) {

    // Note: goinstant is a global

    var CouchGo = {

        URL: 'https://goinstant.net/extra-hand-sanitizer/couch',

        initialize: function(roomName) {
            _.bindAll(this, 'removeContent');

            goinstant.connect(CouchGo.URL, function(err, connection, lobby) {
                if (err) {
                    throw err;
                }

                CouchGo.room = connection.room(roomName);

                CouchGo.room.join(function(err, room, user) {
                    if (err) {
                        throw err;
                    }
                    CouchGo.onRoomConnected(room, user);
                });
            });

            Application.getInstance().on('video:remove', this.removeContent);
        },

        removeContent: function(videoId) {
            if (!videoId) {
                return;
            }

            var key = this.room.key(['playlist', videoId].join('/'));
            key.remove({local: false}, function(err) {
                if (err) {
                    throw err;
                }
            });
        },

        onWatchError: function(err) {
            if (err) {
                throw err;
            }
        },

        onGetPlaylist: function(playlist) {
            console.log('onGetPlaylist');
            console.log(playlist);

            Application.getInstance().trigger('playlist:get', playlist);
        },

        onNewContent: function(content) {
            console.log('onNewContent');
            console.log(content);

            Application.getInstance().trigger('playlist:add', content);
        },

        onRemoveContent: function(keyName) {
            console.log('onRemoveContent');
            console.log(keyName);

            Application.getInstance().trigger('playlist:remove', keyName);
        },

        onRoomConnected: function(room, user) {
            Application.getInstance().trigger('room:connect', {
                room: room,
                user: user
            });

            var playlist = room.key('/playlist'),
                listener = function(value, context) {
                    if (context.command === 'GET') {
                        CouchGo.onGetPlaylist(value);
                    } else if (context.command === 'SET') {
                        CouchGo.onNewContent(value);
                    } else if (context.command === 'REMOVE') {
                        CouchGo.onRemoveContent(context.key);
                    }
                };

            playlist.watch(listener, CouchGo.onWatchError);
        }
    };

    return CouchGo;

});
