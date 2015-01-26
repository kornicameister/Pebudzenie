define(
    [],
    function aboutController() {
        return function ($scope) {
            console.log("About Controller");
            $scope.title = 'O aplikacji';
            $scope.items = [
                {
                    label      : 'Tomasz Trębski',
                    description: 'Angular Ninja Warrior',
                    email      : 'tomasz.trebski@gmail.com'
                },
                {
                    label      : 'Sebastian Jakowski',
                    description: 'Munja Warrior',
                    email      : 'sjak90@gmail.com'
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