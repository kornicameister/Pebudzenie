/**
 * Created by Tomasz on 2015-01-02.
 */
define(
    [
        'config/app',
        'constants/mapEvents'
    ],
    function centerMe(app, MAP_EVENTS) {
        app.controller('MapCenterMeController', function ($scope, $ionicPopup, $ionicLoading, geolocation) {

            var helpers = {
                setLocation         : function setPosition(pos) {
                    $scope.$emit(MAP_EVENTS.CENTER_ME, pos);
                    $ionicLoading.hide();
                },
                showGetLocationError: function showError(error) {
                    $ionicPopup.alert({
                        title   : 'Błąd',
                        template: error
                    });
                }
            };

            $scope.text = 'Moja lokalizacja';
            $scope.execute = function () {
                $ionicLoading.show({
                    content     : 'Pobieram lokalizacje...',
                    scope       : $scope,
                    showBackdrop: false
                });
                geolocation.getLocation().then(helpers.setLocation, helpers.showGetLocationError);
            }

        })
    }
);