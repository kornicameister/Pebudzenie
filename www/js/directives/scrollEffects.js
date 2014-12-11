/**
 * Created by trebskit on 2014-12-11.
 */
define(
    [
        'ionic'
    ],
    function scrollEffects(ionic) {
        return {
            name      : 'scrollEffects',
            definition: function () {
                return {
                    restrict: 'A',
                    link    : function ($scope, $element) {
                        var amt, st, header;
                        var bg = document.querySelector('.bg-image');
                        $element.bind('scroll', function (e) {
                            if (!header) {
                                header = document.getElementById('header');
                            }
                            st = e.detail.scrollTop;
                            if (st >= 0) {
                                header.style.webkitTransform = 'translate3d(0, 0, 0)';
                            } else if (st < 0) {
                                header.style.webkitTransform = 'translate3d(0, ' + -st + 'px, 0)';
                            }
                            amt = Math.min(0.6, st / 1000);

                            ionic.requestAnimationFrame(function () {
                                header.style.opacty = 1 - amt;
                                if (bg) {
                                    bg.style.opacity = 1 - amt;
                                }
                            });
                        });
                    }
                }
            }
        }
    }
);