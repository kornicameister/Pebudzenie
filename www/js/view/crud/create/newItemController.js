define(
    [],
    function newItemController() {
        return function ($scope) {
            $scope.title = 'Nowa pozycja';
            $scope.selectedItem = undefined;

            $scope.$watch('selectedItem', function (newVal, oldVal) {
                if (newVal === oldVal) {
                    return;
                }
                console.log(newVal);
            })
        }
    }
);