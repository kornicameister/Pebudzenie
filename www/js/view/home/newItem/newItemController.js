define(
    [],
    function newItemController() {
        return function newItemController($log, $scope, $state) {
            $log.debug('newItemController');

            $scope.title = 'Nowa pozycja';
            $scope.itemTypes = [
                {
                    view : 'sg.new.newPlace',
                    label: 'Nowe miejsce'
                }
            ];
            $scope.selectedItem = undefined;

            $scope.$watch('selectedItem', function (newVal, oldVal) {
                if (newVal === oldVal) {
                    return;
                }
                $state.go(newVal);
            })
        }
    }
);