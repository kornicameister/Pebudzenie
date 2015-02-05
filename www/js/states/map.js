define(
    [
        'view/map/mapController',
        'view/map/actionSheet.controller',
        // angular injections
        'angularGeolocation',
        'services/map/markers',
        'services/activeViewMenu'    // activeView settings service
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