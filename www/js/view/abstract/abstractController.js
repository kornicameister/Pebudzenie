define(
    [],
    function abstractController() {
        return function ($scope, $log) {
            $scope.showSettings = function ($event) {
                $log.debug('showSettings called');
                $event.preventDefault();
            }
        };
    }
);