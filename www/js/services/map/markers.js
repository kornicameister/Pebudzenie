/**
 * Created by Tomasz on 2015-01-03.
 */
define(
    [
        'config/app'
    ],
    function mapMarkersService(app) {

        // $q will be likely removed later
        app.factory('mapMarkersService', function ($log, $q) {
            $log.debug('Loading mapMarkersService');

            // TMP solution before adding some kind of external API to handle
            // persisting of markers
            var mockedMarkers = [];

            return {
                /**
                 * Retrieves all markers to be displayed within a map instance
                 * @return promise
                 */
                read: function getMarkers() {
                    $log.debug('Reading all available markers');
                    var deferred = $q.defer();
                    setTimeout(function () {
                        deferred.resolve(mockedMarkers)
                    }, 1000);
                    return deferred.promise;
                },
                /**
                 * Saves
                 * @param markers [Object|Array] of markers to be persisted
                 */
                save: function (markers) {
                    if (!_.isArray(markers)) {
                        markers = [markers];
                    }
                    mockedMarkers = markers;
                }
            }

        });

    }
);