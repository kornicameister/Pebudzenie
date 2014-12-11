(function () {

    console.log('main.js >> initializing requireJs configuration');

    var clientId = GOOGLE_MAP_API_KEY;

    requirejs.config({
        paths   : {
            googleMaps     : 'https://maps.googleapis.com/maps/api/js?key=' + clientId + '&v=3.18&callback=initialize',
            angular        : '../lib/js/angular/angular.min',
            angularAnimate : '../lib/js/angular/angular-animate.min',
            angularSanitize: '../lib/js/angular/angular-sanitize.min',
            angularResource: '../lib/js/angular/angular-resource.min',
            uiRouter       : '../lib/js/angular-ui/angular-ui-router.min',
            ionic          : '../lib/js/ionic.min',
            ionicAngular   : '../lib/js/ionic-angular.min',
            text           : '../lib/js/text'
        },
        shim    : {
            angular        : {exports: 'angular'},
            angularAnimate : {deps: ['angular']},
            angularSanitize: {deps: ['angular']},
            angularResource: {deps: ['angular']},
            uiRouter       : {deps: ['angular']},
            ionic          : {deps: ['angular'], exports: 'ionic'},
            ionicAngular   : {deps: ['angular', 'ionic', 'uiRouter', 'angularAnimate', 'angularSanitize', 'angularResource']}
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