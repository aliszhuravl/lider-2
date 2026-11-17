$(document).ready(function(){
    var $box = $("#counts");
    if (!$box.length) return;

    var show = true;
    var counters = $(".spincrement").map(function () {
        var $el = $(this);
        var target = parseInt($el.text(), 10) || 0;
        $el.text(0);
        return { el: $el, target: target };
    }).get();

    function play() {
        if (!show) return;
        var wTop = $(window).scrollTop();
        var wHeight = $(window).height();
        var eTop = $box.offset().top;
        var eHeight = $box.outerHeight();
        var onScreen = eTop < wTop + wHeight && eTop + eHeight > wTop;
        if (!onScreen) return;

        show = false;
        $.each(counters, function (_, item) {
            $({ n: 0 }).animate({ n: item.target }, {
                duration: 5000,
                step: function (now) {
                    item.el.text(Math.round(now));
                },
                complete: function () {
                    item.el.text(item.target);
                }
            });
        });
    }

    $(window).on("scroll resize", play);
    play();
});