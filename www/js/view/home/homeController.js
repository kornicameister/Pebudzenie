define(
    [],
    function homeController() {
        return function ($scope, $log) {
            $log.debug('homeController');
            $scope.title = 'Home'
        };
    }
);