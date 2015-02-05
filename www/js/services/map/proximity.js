define(
    [
        'config/app',
        'lodash',
        // angular injections
        'providers/mapMarkersProximity.provider'
    ],
    function proximityService(app, _) {
        app.factory('mapProximityService', ['$log', '$q', '$mapMarkerProximity', '$timeout', serviceFunction]);
        function serviceFunction($log,
                                 $q,
                                 $mapMarkerProximity,
                                 $timeout) {
            var service = {};

            /**
             * @function
             * @type {getNearbyPoints}
             * @returns promise
             * @param pos actual position
             *
             * @description
             *
             * Method retrieves points (i.e. markers) located within given range [proximityConfigurationProvider]
             * from given location
             */
            service.getNearbyPoints = getNearbyPoints;
            service.proximate = proximate;

            return service;

            function toLatLng(cords) {
                return new google.maps.LatLng(cords.latitude, cords.longitude);
            }

            function isNearbyMarker(markerCords, posCords, radius, unit) {

                markerCords = toLatLng(markerCords);
                posCords = toLatLng(posCords);

                var d = google.maps.geometry.spherical.computeDistanceBetween(markerCords, posCords);
                return radius >= d;
            }

            function proximate(posPromise, markers) {
                return $q(function (resolve, reject) {
                    posPromise.then(function (pos) {
                        getNearbyPoints(pos, markers).then(resolve, reject);
                    });
                });
            }

            function getNearbyPoints(pos, markers) {
                var defered = $q.defer(),
                    radius,
                    unit;
                if (!pos) {
                    $log.warn('Cannot calculate position, pos is undefined');
                    defered.reject('Cannot calculate position, pos is undefined');
                }

                radius = $mapMarkerProximity.getRadius();
                unit = $mapMarkerProximity.getUnit();

                markers = _.transform(markers, function (result, marker) {
                    return result.push({
                        id       : marker.id,
                        latitude : marker.latitude,
                        longitude: marker.longitude
                    });
                });

                $timeout(function () {
                    defered.resolve(_.filter(markers, function (marker) {
                        return isNearbyMarker(
                            _.pick(marker, ['latitude', 'longitude']),
                            _.pick(pos.coords, ['latitude', 'longitude']),
                            radius,
                            unit
                        );
                    }));
                }, 100);

                return defered.promise;
            }
        }
    }
);