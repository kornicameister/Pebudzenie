(function () {

    console.log('main.js >> initializing requireJs configuration');
    var clientId = GOOGLE_MAP_API_KEY;
    console.log('GOOGLE_MAP_API_KEY = ' + clientId);

    requirejs.config({
        paths   : {
            angular           : '../lib/bc/angular/angular',
            angularAnimate    : '../lib/bc/angular-animate/angular-animate.min',
            angularSanitize   : '../lib/bc/angular-sanitize/angular-sanitize.min',
            angularResource   : '../lib/bc/angular-resource/angular-resource.min',
            angularGoogleMaps : '../lib/bc/angular-google-maps/dist/angular-google-maps.min',
            angularGeolocation: '../lib/bc/angularjs-geolocation/dist/angularjs-geolocation.min',
            uiRouter          : '../lib/bc/angular-ui-router/release/angular-ui-router.min',
            ionic             : '../lib/bc/ionic/release/js/ionic.min',
            ionicAngular      : '../lib/bc/ionic/release/js/ionic-angular.min',
            text              : '../lib/js/text',
            lodash            : '../lib/bc/lodash/dist/lodash.min'
        },
        shim    : {
            angular           : {exports: 'angular'},
            angularAnimate    : {deps: ['angular']},
            angularGeolocation: {deps: ['angular']},
            angularSanitize   : {deps: ['angular']},
            angularResource   : {deps: ['angular']},
            uiRouter          : {deps: ['angular']},
            angularGoogleMaps : {deps: ['angular', 'lodash']},
            ionic             : {deps: ['angular'], exports: 'ionic'},
            ionicAngular      : {deps: ['angular', 'ionic', 'uiRouter', 'angularAnimate', 'angularSanitize', 'angularResource']}
        },
        priority: [
            'angular',
            'ionic'
        ],
        deps    : [
            'init'      // launches init.js to bootstrap the application
        ]
    });

}());