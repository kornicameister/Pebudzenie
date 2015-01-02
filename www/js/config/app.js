define(
    [
        'angular',
        // other dependencies
        'angularGeolocation',
        'uiRouter',
        'ionicAngular',
        'angularGoogleMaps'
    ],
    function (angular) {

        'use strict';

        return angular.module('przebudzenie', [
            'ionic',
            'ui.router',
            'geolocation',
            'uiGmapgoogle-maps'
        ]).run(function ($ionicPlatform, $log) {

            $ionicPlatform.ready(function () {
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
                $log.debug('ionicPlatform.ready(...) called');
            });

        }).config(function (uiGmapGoogleMapApiProvider) {
            uiGmapGoogleMapApiProvider.configure({
                key      : GOOGLE_MAP_API_KEY,
                v        : '3.17',
                libraries: 'weather,geometry,visualization',
                sensor   : true,
                language : 'pl'
            });
        });

    }
);