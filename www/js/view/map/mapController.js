define(
    [],
    function mapController() {

        return function ($scope,
                         $log,
                         $ionicLoading,
                         $ionicPopup,
                         geolocation,
                         currentPosition // from resolve param in the state definition
        ) {

            var loggers = {
                    logCoordinates: function (pos) {
                        $log.debug('logCoordinates >> [latitude=' + pos.coords.latitude + ';longitude=' + pos.coords.longitude + ']');
                    }
                },
                helpers = {
                    setLocation         : function setPosition(pos) {
                        loggers.logCoordinates(pos);
                        $scope.map.control.refresh({
                            latitude : pos.coords.latitude,
                            longitude: pos.coords.longitude
                        });
                        if ($scope.loading) {
                            $scope.loading.hide();
                        }
                    },
                    showGetLocationError: function showError(error) {
                        $log.error(error);
                        $ionicPopup.alert({
                            title   : 'Błąd',
                            template: error
                        });
                    }
                };

            $scope.title = 'Map';

            /**
             * Initialize the map and set in the scope
             */
            $scope.map = (function () {

                /**
                 * @see http://angular-ui.github.io/angular-google-maps/#!/api
                 */
                var map = {
                    center   : {
                        latitude : 45,
                        longitude: -73
                    },
                    draggable: true,
                    options  : {
                        scrollwheel: false
                    },
                    zoom     : 8,
                    control  : {}
                };

                if (currentPosition) {
                    $log.debug('Retrieved actual position from the state resolve');

                    map.center.latitude = currentPosition.coords.latitude;
                    map.center.longitude = currentPosition.coords.longitude;

                    loggers.logCoordinates(currentPosition);
                }

                return map;
            })();

            $scope.controls = {
                CenterOnMe: (function () {
                    var parentScope = $scope;
                    return function ($scope) {

                        $scope.execute = function(){
                            if (!parentScope.map) {
                                return;
                            }

                            parentScope.loading = $ionicLoading.show({
                                content     : 'Getting current location...',
                                scope       : $scope,
                                showBackdrop: false
                            });

                            geolocation.getLocation().then(helpers.setLocation, helpers.showGetLocationError);
                        }
                    }
                }())
            };

        };
    }
);