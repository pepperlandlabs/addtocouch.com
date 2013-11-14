define(function(require) {
    'use strict';

    var Marionette = require('marionette');

    return Marionette.ItemView.extend({

        modelEvents: {
            'change': 'render'
        },

        template: {
            type: 'handlebars',
            template: require('hb!components/playlist/queue_item.handlebars')
        }

    });

});
