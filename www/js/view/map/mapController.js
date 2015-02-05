define(
    [
        'constants/mapEvents',
        'lodash',
        // angular injections
        'services/map/markers',
        'services/map/proximity',
        'providers/mapMarkersProximity.provider',
        'view/map/controls/centerMe'    // control for the centerMe action
    ],
    function mapController(MAP_EVENTS, _) {

        return function ($scope,
                         $log,
                         $ionicLoading,
                         $ionicPopup,
                         $interval,
                         $timeout,
                         $mapMarkerProximity,
                         mapProximityService,
                         geolocation,
                         uiGmapGoogleMapApi,
                         mapMarkersService,     // mapMarkers services
                         markers,               // from resolve param in the state definition
                         currentPosition        // from resolve param in the state definition
        ) {
            $log.debug('mapController >> ' + this);

            var self = this;

            $scope.title = 'Mapa';

            $ionicLoading.show({
                template: "Ladowanie map..."
            });

            $scope.show = function (mrk) {
                $log.debug("SHOWING");
                mrk.show = true;
            };

            logCoordinates = _.bind(logCoordinates, $log);

            var listeners = {},
                eventHandlers = {
                    'click': function eventHandlerOnClick(map, event, args) {
                        console.log(event);
                        console.log(args);
                    }
                };

            listeners[MAP_EVENTS.CENTER_ME] = function (event, pos) {
                $log.debug(MAP_EVENTS.CENTER_ME + ' received...');
                if (!pos) {
                    return;
                }
                logCoordinates(pos);

                pos = {
                    latitude : pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    circle   : {
                        center: {
                            latitude : pos.coords.latitude,
                            longitude: pos.coords.longitude
                        },
                        radius: $mapMarkerProximity.getRadius(),
                        stroke: {
                            color  : '#08B21F',
                            weight : 2,
                            opacity: 1
                        },
                        fill  : {
                            color  : '#08B21F',
                            opacity: 0.5
                        }
                    }
                };

                $scope.map.control.refresh(pos);
                $scope.myPosMarker = pos;

                event.stopPropagation();
            };


            /**
             * Set of markers to be used by directive that groups them.
             * <b>Note</b> that this property of the scope
             * holds {@link Array} as their elements therefore
             * it is available to group markers
             * @type {Array}
             */
            $scope.markers = markers || [];
            $scope.markersControl = {};
            $log.debug("All available markers: " + markers.length);
            // set up listeners for map controls
            _.forIn(listeners, function (listener, key) {
                $scope.$on(key, listener);
            });

            uiGmapGoogleMapApi.then(function () {
                console.log('Loading map');
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
                        pan    : true,
                        zoom     : 12,
                        control: {},
                        events : {
                            'click': eventHandlers.click
                        }
                    };

                    if (currentPosition) {
                        $log.debug('Retrieved actual position from the state resolve');

                        map.center.latitude = currentPosition.coords.latitude;
                        map.center.longitude = currentPosition.coords.longitude;
                        $scope.myPosMarker = currentPosition.coords;

                        logCoordinates(currentPosition);
                    } else {
                        $log.warn('No active position presented');
                    }

                    return map;
                })();

                self.checkProximitInterval = $interval(function () {
                    var gMarkers = $scope.markersControl.getGMarkers();
                    try {
                        mapProximityService
                            .proximate(geolocation.getLocation(), $scope.markers || [])
                            .then(function (nearbyMarkers) {
                                nearbyMarkers = nearbyMarkers || [];
                                if (!nearbyMarkers.length) {
                                    return;
                                }

                                _.forEachRight(nearbyMarkers, function (nm) {
                                    if (nm) {
                                        nm = _.findWhere(gMarkers, {key: nm.id});
                                        nm.setAnimation(google.maps.Animation.BOUNCE);
                                        $timeout(function () {
                                            if (nm) {
                                                nm.setAnimation(null);
                                            }
                                        }, $mapMarkerProximity.getInterval() / 2);
                                    }
                                });
                            })
                    } catch (err) {
                        $log.error(err);
                    }
                }, $mapMarkerProximity.getInterval());

                $ionicLoading.hide();
            });

            $scope.$on('destroy', function () {
                self.checkProximitInterval.cancel();
            })
        };

        /**
         * Utility function that logs current position coordinates to the log debug output
         * @param pos
         */
        function logCoordinates(pos) {
            this.debug('logCoordinates >> [latitude=' + pos.coords.latitude + ';longitude=' + pos.coords.longitude + ']');
        }


    }
);