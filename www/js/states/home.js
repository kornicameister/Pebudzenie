define(
    [
        'view/home/homeController',
        'view/home/newItem/newItemController',
        'services/activeViewMenu'
    ],
    function (homeController, newItemController) {
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
                        },
                        // leave it empty for child states to fill in
                        'homeContent': {}
                    }
                }
            },
            {
                name      : 'sg.home.newItem',
                definition: {
                    url  : 'newItem',
                    views: {
                        'homeContent@sg.home': {
                            controller : newItemController,
                            templateUrl: 'js/view/home/newItem/newItem.html'
                        }
                    }
                }
            }
        ]
    }
);