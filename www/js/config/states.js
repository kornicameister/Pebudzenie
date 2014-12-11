define(
    [
        'config/app',
        // states
        'states/abstract',
        'states/home',
        'states/map',
        'states/about'
        // states
    ],
    function configStates(app) {
        'use strict';

        var otherwiseRoute = '/sg/home',
            offset = 1,
            rawArgs = arguments,
            _register = function localRegister($urlRouterProvider, states) {
                var me = this;
                if (states instanceof Array && states.length > 0) {
                    var i;
                    for (i = 0; i < states.length; i++) {
                        _register.call(me, $urlRouterProvider, states[i]);
                    }
                } else if (states.name && states.definition) {
                    console.log('states :: registering state definition for state.name=' + states.name);
                    me.state(states.name, states.definition);
                } else if (states.rule) {
                    console.log('states :: registering rule definition');
                    $urlRouterProvider.when(states.rule.when, states.rule.then);
                }
            };

        return {
            configure: function configure() {
                app.config(function statesConfigure($stateProvider, $urlRouterProvider) {
                    console.log('states >> configuration starting...');
                    try {

                        _register.call($stateProvider, $urlRouterProvider, (function getStates(states) {
                            var local = [],
                                it = offset;
                            for (it; it < states.length; it++) {
                                local.push(states[it]);
                            }
                            return local;
                        }(rawArgs)));

                        $urlRouterProvider.otherwise(otherwiseRoute);
                    } catch (e) {
                        console.error(e.stack || e.message || e)
                    }
                    console.log('states << configuration finished...');
                })
            }
        };
    }
);