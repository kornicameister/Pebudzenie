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
                config = {
                    interval: 5000,
                    radius  : 5,
                    unit    : 'km'
                };

            // config available
            self.configure = configureProvider;

            // service
            self.$get = function () {
                var service = {};

                service.getRadius = new ProximityCalc()[config.unit];
                service.getInterval = _.constant(config.interval);

                return service;
            };

            function configureProvider(conf) {
                config = _.defaults(conf, config);
                return self;
            }

            function ProximityCalc() {
                this.km = function (val) {
                    return val * 1000;
                };
                this.m = function (val) {
                    return val;
                }
            }
        })
    }
);