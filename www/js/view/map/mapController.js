define(
    [
        'googleMaps'
    ],
    function mapController() {
        return function ($scope, $log) {

            // TODO: add geoloaction for current position
            // TODO: add creating map based on it
            // TODO: add

            $log.debug('mapController >> ' + google);

            $scope.title = 'Map';

            var mapOptions = {
                zoom  : 8,
                center: new google.maps.LatLng(-34.397, 150.644)
            };

            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        };
    }
);