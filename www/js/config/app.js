define(
    [
        'angular',
        // other dependencies
        'uiRouter',
        'ionicAngular',
        'angularGeolocation',
        'angularGoogleMaps'
    ],
    function () {

        'use strict';

        return angular.module('pebudzenie', [
            'ionic',
            'ui.router',
            'geolocation',
            'uiGmapgoogle-maps'
        ]).run(function ($ionicPlatform, $log) {

            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
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
        }).constant('appName', 'Pebudzenie')

    }
);