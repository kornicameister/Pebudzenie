/**
 * Created by Tomasz on 2015-01-06.
 */
define(
    [],
    function () {
        return {
            name      : 'sg.new',
            definition: {
                abstract: true,
                url     : '/new',
                views   : {
                    'mainContent': {
                        template: '<ion-view><ion-content><div ui-view/></ion-content></ion-view>'
                    }
                }
            }
        }
    }
);