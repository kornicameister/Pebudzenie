define(
    [
        'angular',
        'config/app'
    ],
    function centerMe(angular, app) {
        app.controller('MapActionSheetController', function ($log,
                                                             $ionicActionSheet,
                                                             $ionicPopover,
                                                             $rootScope,
                                                             $mapMarkerProximity) {
            var self = this,
                popovers = {},
                hideSheet;

            self.showActionSheet = showActionSheet;

            function showActionSheet() {
                $log.debug('showActionSheet()');

                hideSheet = $ionicActionSheet.show({
                    titleText    : 'Szybkie ustawienia',
                    buttons      : [
                        {
                            text: 'Proximity'
                        }
                    ],
                    cancelText   : 'Zamknij',
                    cancel       : hideSheet,
                    buttonClicked: function (index, button) {
                        $log.debug(button);
                        switch (index) {
                            case 0:
                                popupProximitySettings().then(function (modal) {
                                    if (modal) {
                                        modal.show(document.getElementById('daMapContent'));
                                    }
                                });
                                break;
                        }
                        return true;
                    }
                });
            }

            // TODO need to fish it, add handlers etc.
            function popupProximitySettings() {
                if (popovers.proximity) {
                    $log.warn('Proximity popover already shown');
                    return $q(function (resolve) {
                        resolve()
                    });
                }

                var scope = $rootScope.$new(true);

                return $ionicPopover.fromTemplateUrl('js/view/map/modals/proximity.tpl.html', {
                    scope    : scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    popovers.proximity = modal;

                    scope.$on('$destroy', function () {
                        popovers.proximity.remove();
                        delete popovers.proximity;
                    });
                    scope.$on('popover.hidden', function () {
                        delete popovers.proximity;
                    });
                    scope.$on('popover.removed', function () {
                        delete popovers.proximity;
                    });

                    return modal;
                })
            }
        })
    }
);