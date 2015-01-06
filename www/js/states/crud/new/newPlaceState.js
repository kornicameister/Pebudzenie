/**
 * Created by Tomasz on 2015-01-06.
 */
define(
    [
        'view/crud/newPlaceController'
    ],
    function (newPlaceController) {
        return {
            name      : 'sg.new.newPlace',
            definition: {
                url  : '/place',
                views: {
                    '@sg.new': {
                        templateUrl: 'js/view/crud/newPlace.html',
                        controller : newPlaceController
                    }
                }
            }
        }
    }
);