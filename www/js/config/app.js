define(
    [
        'angular',
        // other dependencies
        'uiRouter',
        'ionicAngular'
    ],
    function (angular) {

        'use strict';

        var app = angular.module('przebudzenie', [
            'ionic',
            'ui.router'
        ]);

        app.run(function ($ionicPlatform, $log) {

            $ionicPlatform.ready(function () {
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
                $log.debug('ionicPlatform.ready(...) called');
            });

        });

        return app;
    }
);