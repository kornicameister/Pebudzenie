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

            function isNearbyMarker(markerCords, posCords, radius) {
                var d = Math.sqrt(
                    (markerCords.latitude - posCords.latitude) * (markerCords.latitude - posCords.latitude) +
                    (markerCords.longitude - posCords.longitude) * (markerCords.longitude - posCords.longitude)
                );

                $log.debug('ED=' + d + ', radius=' + radius + ' => ' + radius <= d);

                return radius <= d;
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
                    radius;
                if (!pos) {
                    $log.warn('Cannot calculate position, pos is undefined');
                    defered.reject('Cannot calculate position, pos is undefined');
                }

                radius = $mapMarkerProximity.getRadius();
                markers = _.clone(markers, false, function (marker) {
                    return {
                        id       : marker.id,
                        latitude : marker.latitude,
                        longitude: marker.longitude
                    }
                });

                $timeout(function () {
                    defered.resolve(_.filter(markers, function (marker) {
                        return isNearbyMarker(_.pick(marker, ['latitude', 'longitude']), pos, radius);
                    }));
                }, 100);

                return defered.promise;
            }
        }
    }
);