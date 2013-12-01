var requireConfig = {
    'waitSeconds': 2,
    'baseUrl': '/src/',

    'paths' : {
        'backbone': '/bower_components/backbone/backbone',
        'html5shiv': '/bower_components/html5shiv/dist/html5shiv',
        'html5shivprint': '/bower_components/html5shiv/dist/html5shiv-printshiv',
        'es5shim': '/bower_components/es5-shim/es5-shim',
        'underscore': '/bower_components/underscore/underscore',
        'underscore.string' : '/bower_components/lib/underscore.string',
        'jquery': '/bower_components/jquery/jquery',
        'advice' : '/bower_components/backbone.advice/advice',

        'backbone.wreqr': '/bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.babysitter': '/bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
        'marionette': '/bower_components/marionette/lib/core/amd/backbone.marionette',
        'marionette.handlebars': '/bower_components/backbone.marionette.handlebars/backbone.marionette.handlebars',
        'raphael': '/bower_components/raphael/raphael',
        'sinon': '/bower_components/jasmine-sinon/lib/sinon-1.0.0/sinon-1.0.0',

        'text': '/bower_components/requirejs-text/text',
        'handlebars': '/bower_components/handlebars/handlebars',
        'hb': '/bower_components/requirejs-handlebars/hb',

        'EventEmitter': '/bower_components/EventEmitter/dist/EventEmitter',
        'YouTubePlayer': '/bower_components/requirejs-youtube-player/dist/YouTubePlayer'
    },

    'shim': {
        'jquery': {
            'exports': 'jQuery'
        },
        'underscore': {
            'deps': ['es5shim'],
            'exports': '_'
        },
        'backbone': {
            'deps': ['jquery', 'underscore'],
            'exports': 'Backbone'
        },
        'marionette': {
            'deps': ['underscore', 'backbone', 'advice'],
            'exports': 'Marionette'
        },
        'handlebars': {
            'exports': 'Handlebars'
        }
    },

    'map': {
        '*': {
            'backbone.marionette': 'marionette'
        }
    },

    'deps': [
        'marionette.handlebars'
    ]
};

if (typeof require === 'undefined') {
    // any values set on require before it loads will be used as config
    // ignore the "redefinition error" due to the line below
    var require = requireConfig;
} else {
    require.config(requireConfig);
}

// allow for loading in nodejs
if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = requireConfig;
}
