(function () {
    var app = angular.module('przebudzenie', ['ionic']);

    app.controller('PEController', function ($scope, $ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.StatusBar) {
                StatusBar.hide();
            }
        });
    })

}());