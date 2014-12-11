define(
    [
        'view/abstract/abstractController'
    ],
    function (abstractController) {
        return {
            name      : 'sg',
            definition: {
                abstract   : true,
                url        : '/sg',
                controller : abstractController,
                templateUrl: 'js/view/abstract/abstract.html',
                onEnter    : function () {
                    console.log('Abstract');
                }
            }
        }
    }
);