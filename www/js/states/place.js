/**
 * Created by sebjak on 2015-27-01.
 */
define(
    [
        'view/place/placeController',
        'services/activeViewMenu'
    ],
    function (placeController) {
        return [
            {
                name      : 'sg.place',
                definition: {
                    url  : '/place/:id',
                    menus: [
                        {
                            key  : 'Place',
                            state: 'sg.place',
                            class: 'ion-record',
                            label: 'Miejsce'
                        }
                    ],
                    views: {
                        'mainContent': {
                            controller : placeController,
                            templateUrl: 'js/view/place/place.html'
                        }
                    }
                }
            }
        ]
    }
);