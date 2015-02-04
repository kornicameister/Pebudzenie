/**
 * Created by sebjak on 2015-27-01.
 */
define(
    [
        'view/places/placesController',
        'services/activeViewMenu'
    ],
    function (placesController, placeController) {
        return [
            {
                name      : 'sg.places',
                definition: {
                    url  : '/places',
                    menus: [
                        {
                            key  : 'Places',
                            state: 'sg.places',
                            class: 'ion-record',
                            label: 'Miejsca'
                        }
                    ],
                    views: {
                        'mainContent': {
                            controller : placesController,
                            templateUrl: 'js/view/places/places.html'
                        }
                    }
                }
            }
        ]
    }
);