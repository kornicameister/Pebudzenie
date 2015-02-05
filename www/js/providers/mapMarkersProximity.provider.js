define(
    [
        'config/app',
        'lodash'
    ],
    function mapMarkersProximityProvider(app, _) {
        "use strict";

        app.provider('$mapMarkerProximity', function () {
            // private
            var self = this,
                ProximityCalc = {
                    km: function (val) {
                        return val * 1000;
                    },
                    m : function (val) {
                        return val;
                    }
                },
                config = {
                    interval: 10000,
                    radius  : 3,
                    unit    : 'km'
                };

            // config available
            self.configure = configureProvider;

            // service
            self.$get = function () {
                var service = {};

                service.getRadius = function () {
                    return ProximityCalc[config.unit](config.radius);
                };
                service.getUnit = _.constant(config.unit);
                service.getInterval = _.constant(config.interval);

                return service;
            };

            function configureProvider(conf) {
                config = _.defaults(conf, config);
                return self;
            }
        })
    }
);