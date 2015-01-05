/**
 * Created by Tomasz on 2015-01-02.
 */
define(
    [
        'config/app'
    ],
    function activeViewMenu(app) {
        app.factory('activeViewMenu', function ($log, $rootScope, $state, $ionicSideMenuDelegate) {
            $log.debug('activeViewMenu service loading');

            var isConfigured = false,
                alwaysCloseMenu = false;

            function setInRootScope(settings) {
                if (!$rootScope.activeView) {
                    $rootScope.activeView = {};
                }
                $rootScope.activeView.menus = settings;
            }

            function parseFromStateChangeSuccess(stateName, menus) {
                var newMenus = [];
                if (!menus.length) {
                    return menus;
                }

                var isState = false,
                    newItem;

                _.forEach(menus, function (menu) {
                    if (_.isUndefined(menu.key)) {
                        throw new Error('Submenu has been declared for state ' + stateName + ' but entry has no unique key');
                    }
                    isState = !_.isUndefined(menu.state);

                    newItem = {
                        label  : menu.label,
                        state  : menu.state || '',
                        class  : menu.class || '',
                        isState: true,
                        onClick: function ($event) {
                            if ($event) {
                                $event.stopPropagation();
                            }
                            if (this.isState) {
                                $state.go(this.state);
                            } else {
                                $rootScope.$broadcast(stateName + '$' + menu.key)
                            }
                            $ionicSideMenuDelegate.toggleLeft(alwaysCloseMenu);
                            return false;
                        }
                    };

                    newItem.onClick = _.bind(newItem.onClick, newItem);

                    newMenus.push(newItem);
                });

                return newMenus;
            }

            $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                if (_.isUndefined(toState.menus)) {
                    setInRootScope([]);
                    return;
                }
                $log.debug(toState.name + ' has declared submenus');
                setInRootScope(parseFromStateChangeSuccess(toState.name, toState.menus || []));
            });

            return {
                configure: function () {
                    if (isConfigured) {
                        return true;
                    }

                    $log.debug('Initial configuration of activeViewMenu');

                    setInRootScope([]);
                    return isConfigured = true;
                },
                getMenus : function () {
                    return $rootScope.activeView ? $rootScope.activeView.menus || [] : undefined;
                }
            };

        });
    }
);