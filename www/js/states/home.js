/**
 * Created by trebskit on 2014-12-11.
 */
define(
    [
        'services/activeViewMenu',
        'view/home/homeController'
    ],
    function (homeController) {
        return [
            {
                name      : 'sg.home',
                definition: {
                    url  : '/home',
                    menus: [
                        {
                            key  : 'newItem',
                            state: 'sg.home.newItem',
                            class: 'ion-record',
                            label: 'Nowa pozycja'
                        }
                    ],
                    views: {
                        'mainContent': {
                            controller : homeController,
                            templateUrl: 'js/view/home/home.html'
                        }
                    }
                }
            },
            {
                name      : 'sg.home.newItem',
                definition: {
                    url  : 'newItem',
                    views: {
                        'mainContent': {
                            template: 'test'
                        }
                    }
                }
            }
        ]
    }
);