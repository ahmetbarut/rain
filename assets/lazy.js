$(document).ready(function () {
    $(window).scroll(function () {
        $(".lazy").each(function () {
            if ($(this).offset().top &lt; $(window).scrollTop() + $(window).height() + 100) {
                $(this).attr("src", $(this).attr("data-src"));
            }
        });
    });
});