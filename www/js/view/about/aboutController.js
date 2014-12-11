define(
    [],
    function aboutController() {
        return function ($scope) {
            $scope.items = [
                {
                    label      : 'Tomasz Trębski',
                    description: 'Angular Ninja Warrior',
                    email      : 'tomasz.trebski@gmail.com'
                },
                {
                    label      : 'Sebastian Jakowski',
                    description: 'Munja Warrior',
                    email      : 'sjak91@gmail.com'
                }
            ];

            $scope.actions = {
                contact: function (item) {
                    console.log(item.email);
                }
            }
        };
    }
);