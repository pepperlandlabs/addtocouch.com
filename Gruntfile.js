module.exports = function (grunt) {
    'use strict';

    var pkg = grunt.file.readJSON('package.json'),
        aws = grunt.file.readJSON('grunt-aws.json'),
        bannerTemplate = '/*!\n' +
            ' * ' + pkg.name + ' - v' + pkg.version + ' ' + pkg.homepage + '\n' +
            ' * Built: ' + grunt.template.today('yyyy-mm-dd') + '\n' +
            ' * Copyright (c) ' + grunt.template.today('yyyy-mm-dd') + ' ' + pkg.author + '\n' +
            ' * Licensed under the ' + pkg.license + ' license\n' +
            ' */\n',
        _ = require('underscore'),
        Deferred = require('simply-deferred').Deferred,
        when = require('simply-deferred').when;
    // requirejs = require('requirejs');

    grunt.initConfig({
        pkg: pkg,
        aws: aws,
        bannerTemplate: bannerTemplate,
        compass: {
            dist: {
                options: {
                    sassDir: 'assets/sass',
                    cssDir: 'assets/css',
                    imagesDir: 'assets/images',
                    fontsDir: 'assets/fonts',
                    javascriptDir: 'src',
                    relativeAssets: true
                }
            }
        },
        s3: {
            options: {
                key: aws.key,
                secret: aws.secret,
                bucket: aws.bucket,
                access: 'public-read',
                headers: {
                    // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
                    "Cache-Control": "max-age=630720000, public",
                    "Expires": new Date(Date.now() + 63072000000).toUTCString()
                }
            },
            dev: {
                // These options override the defaults
                options: {
                    encodePaths: true,
                    maxOperations: 20
                },
                // Files to be uploaded.
                upload: [{
                    src: 'assets/**/*',
                    dest: 'assets',
                    rel: 'assets',
                    options: {
                        gzip: true
                    }
                },
                {
                    src: 'bower_components/**/*',
                    dest: 'bower_components',
                    rel: 'bower_components',
                    options: {
                        gzip: true
                    }
                },
                {
                    src: 'src/**/*',
                    dest: 'src',
                    rel: 'src',
                    options: {
                        gzip: true
                    }
                },

                {
                    src: 'index.html',
                    dest: 'index.html',
                    options: {
                        gzip: true
                    }
                }
                ]
            }
        },
        requirejs: {
          compile: {
            options: {
                'waitSeconds': 2,
    'baseUrl': './src',

    'paths' : {
        'backbone': '../bower_components/backbone/backbone',
        'html5shiv': '../bower_components/html5shiv/dist/html5shiv',
        'html5shivprint': '../bower_components/html5shiv/dist/html5shiv-printshiv',
        'es5shim': '../bower_components/es5-shim/es5-shim',
        'underscore': '../bower_components/underscore/underscore',
        'underscore.string' : '../bower_components/lib/underscore.string',
        'jquery': '../bower_components/jquery/jquery',
        'advice' : '../bower_components/backbone.advice/advice',

        'backbone.wreqr': '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.babysitter': '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
        'marionette': '../bower_components/marionette/lib/core/amd/backbone.marionette',
        'marionette.handlebars': '../bower_components/backbone.marionette.handlebars/backbone.marionette.handlebars',
        'raphael': '../bower_components/raphael/raphael',
        'sinon': '../bower_components/jasmine-sinon/lib/sinon-1.0.0/sinon-1.0.0',

        'text': '../bower_components/requirejs-text/text',
        'handlebars': '../bower_components/handlebars/handlebars',
        'hb': '../bower_components/requirejs-handlebars/hb',

        'EventEmitter': '../bower_components/EventEmitter/dist/EventEmitter',
        'YouTubePlayer': '../bower_components/requirejs-youtube-player/dist/YouTubePlayer'
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
    ],
              name: "apps/index",
              out: "assets/js/app"
            }
          }
        }
     });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-curl');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-s3');

    grunt.task.run('notify_hooks');

    grunt.registerTask('build', [
        'compass'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);

    grunt.registerTask('production', [
        'build',
        'requirejs',
        's3'
    ]);
};
