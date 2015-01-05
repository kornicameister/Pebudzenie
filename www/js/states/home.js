/**
 * Created by trebskit on 2014-12-11.
 */
define(
    [
        'view/home/homeController'
    ],
    function (homeController) {
        return {
            name      : 'sg.home',
            definition: {
                url  : '/home',
                views: {
                    'mainContent': {
                        controller : homeController,
                        templateUrl: 'js/view/home/home.html'
                    }
                }
            }
        }
    }
);