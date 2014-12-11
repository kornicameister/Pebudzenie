/**
 * Created by trebskit on 2014-12-11.
 */
define(
    [
        'view/map/mapController'
    ],
    function (mapController) {
        return {
            name      : 'sg.map',
            definition: {
                url  : '/map',
                title: 'Mapa',
                views: {
                    'map-tab': {
                        controller : mapController,
                        templateUrl: 'js/view/map/map.html'
                    }
                }
            }
        }
    }
);