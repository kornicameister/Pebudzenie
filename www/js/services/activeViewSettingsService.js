/**
 * Created by Tomasz on 2015-01-02.
 */
define(
    [
        'config/app'
    ],
    function activeViewSettingsService(app) {
        app.factory('activeViewSettingsService', function ($log, $rootScope) {

            function setInRootScope(settings) {
                if (!$rootScope.activeView) {
                    $rootScope.activeView = {};
                }
                $rootScope.activeView.settings = settings;
            }

            return {
                setSettings: function (settings) {
                    if (!(settings instanceof Array)) {
                        settings = [settings];
                    }
                    $log.debug('setSettings[settings=' + settings.length + ']');
                    setInRootScope(settings);
                },
                getSettings: function () {
                    return $rootScope.activeView ? $rootScope.activeView.settings || [] : undefined;
                }
            };

        });
    }
);