define(function(require) {
    'use strict';

    var $ = require('jquery'),
        Marionette = require('marionette'),
        app;

    var NoInstanceException = {
        message: 'An application instance must be initialized via create() before accessing getInstance().',
        name: "NoInstanceException",
        toString: function () {
            return this.name + this.message;
        }
    };

    return {
        create: function(el) {
            // app is a singleton
            if (app) {
                return app;
            }

            app = new Marionette.Application();

            if (typeof el === 'undefined') {
                el = $('<div id="layout">');
            }

            app.el = el;

            // Sandbox here...
            app.reqres.setHandler('el', function() {
                return el;
            });

            app.reqres.setHandler('$el', function() {
                return $(el);
            });

            return app;
        },
        getInstance: function() {
            if (!app) {
                throw NoInstanceException;
            }

            return this.create();
        },
        destroy: function() {
            app = undefined;
        }
    };
});
