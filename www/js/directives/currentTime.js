/**
 * Created by trebskit on 2014-12-11.
 */
define(
    [],
    function currentTime() {
        return {
            name      : 'currentTime',
            definition: function ($timeout, $filter) {
                return {
                    restrict: 'E',
                    replace : true,
                    template: '<span class="current-time">{{currentTime}}</span>',
                    scope   : false,
                    link    : function ($scope) {
                        $timeout(function checkTime() {
                            $scope.currentTime = $filter('date')(+(new Date), 'h:mm');
                            $timeout(checkTime, 500);
                        });
                    }
                }
            }
        }
    }
);