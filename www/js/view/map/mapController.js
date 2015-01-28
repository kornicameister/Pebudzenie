define(
    [
        'constants/mapEvents',
        'lodash',
        // angular injections
        'services/map/markers',
        'view/map/controls/centerMe'    // control for the centerMe action
    ],
    function mapController(MAP_EVENTS) {

        return function ($scope,
                         $log,
                         $ionicLoading,
                         $ionicPopup,
                         uiGmapGoogleMapApi,
                         mapMarkersService,     // mapMarkers services
                         markers,               // from resolve param in the state definition
                         currentPosition        // from resolve param in the state definition
        ) {
            $log.debug('mapController >> ' + this);
            $scope.title = 'Mapa';

            $ionicLoading.show({
                template: "Ladowanie map..."
            });

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
                    longitude: pos.coords.longitude
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
            $log.debug("All available markers: " +markers.length);
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
                        zoom     : 10,
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

               $ionicLoading.hide();
            });
    
            $scope.show = function(id){
                $log.debug("show");
                markers[id].show = true;
            };
        };

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


    }
);