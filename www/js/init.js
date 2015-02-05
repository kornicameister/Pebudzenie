define(
    [
        'config/app',
        'config/states',
        'config/directives',
        // services ro be loaded
        'services/activeViewMenu',
        // other deps
        'ionic',
        'text',
        'lodash'
    ],
    function (app,
              states,
              directives) {
        'use strict';

        console.log('init.js >> configuring to init application');

        states.configure();
        directives.configure();

        app.run(function (activeViewMenu) {
            activeViewMenu.configure();
        });

        setTimeout(function () {
            console.log('init.js >> bootstrapping angular application name=' + app['name']);
            window.name = 'NG_DEFER_BOOTSTRAP';
            angular.bootstrap(document, [
                app['name']
            ]);
        }, 10);

    }
);