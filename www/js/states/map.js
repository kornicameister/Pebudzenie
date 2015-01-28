/**
 * Created by trebskit on 2014-12-11.
 */
define(
    [
        'view/map/mapController',
        // angular injections
        'angularGeolocation',
        'services/map/markers',
        '../services/activeViewMenu'    // activeView settings service
    ],
    function (mapController) {
        return {
            name      : 'sg.map',
            definition: {
                url    : '/map',
                resolve: {
                    'markers'        : function (mapMarkersService) {
                        return mapMarkersService.read();
                    },
                    'currentPosition': function (geolocation) {
                        return geolocation.getLocation();
                    }
                },
                views  : {
                    mainContent: {
                        controller : mapController,
                        templateUrl: 'js/view/map/map.html'
                    }
                }
            }
        }
    }
);