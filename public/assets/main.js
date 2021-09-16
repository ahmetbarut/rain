AOS.init();
$(document).ready(function() {
    $("#loading").fadeOut();
    var first = $(".slider .slide_viewer .slide").first().css("display", "block");
    $('.slider').each(function() {
        var $this = $(this);
        var $group = $this.find('.slide_group');
        var $slides = $this.find('.slide');
        var bulletArray = [];
        var currentIndex = 0;
        var timeout;

        function move(newIndex, animateLeft) {
            var slideLeft;
            advance();
            if ($group.is(':animated') || currentIndex === newIndex) {
                return;
            }
            slideLeft = '100%';

            $slides.eq(newIndex).css({
                display: 'block',
                left: slideLeft
            });
            $group.animate({
                left: animateLeft
            }, function() {
                $slides.eq(currentIndex).css({
                    display: 'none'
                });
                $slides.eq(newIndex).css({
                    left: 0
                });
                $group.css({
                    left: 0
                });
                currentIndex = newIndex;
            });
        }

        function advance() {
            animateLeft = '-100%';
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                if (currentIndex < ($slides.length - 1)) {
                    move(currentIndex + 1, animateLeft);
                } else {
                    move(0, animateLeft);
                }
            }, 4000);
        }

        $('.slider').on('mouseover', function() {
            clearTimeout(timeout);
        });

        $('.slider').on('mouseout', function() {
            advance();
        });

        $('.next_btn').on('click', function() {
            animateLeft = '-100%';

            if (currentIndex < ($slides.length - 1)) {
                move(currentIndex + 1, animateLeft);
            } else {
                move(0, animateLeft);
            }
        });

        $('.previous_btn').on('click', function(e) {
            e.preventDefault();
            animateLeft = '100%';
            if (currentIndex !== 0) {
                move(currentIndex - 1, animateLeft);
            } else if (currentIndex === 0) {
                move($slides.length - 1, animateLeft);
            } else {
                return false;
            }

        });
        advance();
    });
});
$(document).ready(function() {
    $('.jobs, .plaque, .building, .towns, #usagetype, #year select').select2();
});