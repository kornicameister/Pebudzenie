define(
    [
        'lodash',
        'constants/mapEvents',
        'view/map/controls/centerMe'
    ],
    function mapController(lodash, MAP_EVENTS) {
        function CenterMeMarker(pos) {
            this.coords = pos;
        }

        CenterMeMarker.prototype = {
            id     : 'MY_POS',
            options: {
                optimized: true
            }
        };

        /**
         * Utility function that logs current position coordinates to the log debug output
         * @param pos
         */
        function logCoordinates(pos) {
            this.debug('logCoordinates >> [latitude=' + pos.coords.latitude + ';longitude=' + pos.coords.longitude + ']');
        }

        return function ($scope,
                         $log,
                         $ionicLoading,
                         $ionicPopup,
                         uiGmapGoogleMapApi,
                         currentPosition // from resolve param in the state definition
        ) {

            logCoordinates = _.bind(logCoordinates, $log);

            var listeners = {};

            listeners[MAP_EVENTS.CENTER_ME] = function (event, pos) {
                $log.debug(MAP_EVENTS.CENTER_ME + ' received...');
                if (!pos) {
                    return;
                }
                logCoordinates(pos);

                pos = {
                    latitude : pos.coords.latitude,
                    longitude: pos.coords.longitude
                };

                $scope.map.control.refresh(pos);
                $scope.myPosMarker = new CenterMeMarker(pos);

                event.stopPropagation();
            };

            $scope.title = 'Map';
            $scope.loading = $ionicLoading.show({
                content     : 'Ładowanie mapy, proszę czekać...',
                scope       : $scope,
                showBackdrop: false
            });
            /**
             * Set of markers to be used by directive that groups them
             * @type {Array}
             */
            $scope.markers = [];

            // set up listeners for map controls
            _.forIn(listeners, function (listener, key) {
                $scope.$on(key, listener);
            });

            uiGmapGoogleMapApi.then(function () {
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
                        zoom     : 16,
                        control  : {}
                    };

                    if (currentPosition) {
                        $log.debug('Retrieved actual position from the state resolve');

                        map.center.latitude = currentPosition.coords.latitude;
                        map.center.longitude = currentPosition.coords.longitude;

                        logCoordinates(currentPosition);
                    }

                    return map;
                })();

                $scope.loading.hide();
                delete $scope.loading;
            });

        };
    }
);