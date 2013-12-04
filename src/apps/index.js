define(function(require) {
    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone'),
        Marionette = require('marionette'),

        Application = require('core/application'),
        RoomController = require('components/rooms/controller'),

        router,
        roomController = new RoomController(),
        $el = $('<div>').attr({
            'class': 'l-wrapper'
        }),
        app = Application.create($el);

    router = new Marionette.AppRouter({
        controller: roomController,
        appRoutes: {
            '': 'index',
            'room/:id': 'view',
            'remote/:id': 'remote'
        }
    });

    app.reqres.setHandler('router', function() {
        return router;
    });

    $(document).on('click', 'a[href]', function(e) {
        var $el = $(e.currentTarget),
            hasSpecialKey = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey,
            href = $el.attr('href'),
            isExternal = (href.indexOf('http') > -1) ? true : false,
            url;

        if (!hasSpecialKey && !isExternal) {
            e.preventDefault();

            href = $el.attr('href');
            url = href.replace(/^\//,'').replace('\#\!\/','');

            router.navigate(url, { trigger: true });

            return false;
        }
    });

    $('body').append($el);

    Backbone.history.start({ pushState: true });
});
