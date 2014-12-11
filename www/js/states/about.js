/**
 * Created by trebskit on 2014-12-11.
 */
define(
    [
        'view/about/aboutController'
    ],
    function (aboutController) {
        return {
            name      : 'sg.about',
            definition: {
                url  : '/about',
                title: 'O aplikacji',
                views: {
                    'about-tab': {
                        controller : aboutController,
                        templateUrl: 'js/view/about/about-tab.html'
                    }
                }
            }
        }
    }
);