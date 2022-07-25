function AnimateRotate(angle) {

    var $elem = $('#bac');


    $({deg: 0}).animate({deg: angle}, {
        duration: 1500,
        step: function(now) {

            $elem.css({
                transform: 'rotate(' + now + 'deg)'
            });
        }
    });
}
function AnimateRotateo(angle) {

    var $elem = $('#bac');


    $({deg: angle}).animate({deg: 0}, {
        duration: 1500,
        step: function(now) {

            $elem.css({
                transform: 'rotate(' + now + 'deg)'
            });
        }
    });
}
