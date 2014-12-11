define(
    [
        'ionic',
        'angular',
        'config/app',
        // configuration
        'config/states',
        'config/directives'
    ],
    function (ionic,
              angular,
              app,
              states, directives) {
        'use strict';

        console.log('init.js >> configuring to init application');

        states.configure();
        directives.configure();

        document.addEventListener("deviceready", function () {
            setTimeout(function () {
                console.log('init.js >> bootstrapping angular application name=' + app['name']);
                window.name = 'NG_DEFER_BOOTSTRAP';
                angular.bootstrap(document, [
                    app['name']
                ]);
            }, 10);
        }, false);

    }
);