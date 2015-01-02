/**
 * Created by trebskit on 2014-12-11.
 */
define(
    [
        'view/map/mapController',
        // angular injections
        'angularGeolocation',
        'services/activeViewSettingsService'
    ],
    function (mapController) {
        return {
            name      : 'sg.map',
            definition: {
                url    : '/map',
                title  : 'Mapa',
                views  : {
                    'map-tab': {
                        controller : mapController,
                        templateUrl: 'js/view/map/map.html',
                        resolve    : {
                            'currentPosition': function (geolocation) {
                                return geolocation.getLocation();
                            }
                        }
                    }
                },
                onEnter: function (activeViewSettingsService) {
                    activeViewSettingsService.setSettings([
                        {
                            label: 'CenterMe',
                            name : 'sg.map-centerMe'
                        },
                        {
                            label: 'Settings',
                            name : 'sg.map-settings'
                        }
                    ]);
                }
            }
        }
    }
);