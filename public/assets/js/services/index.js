var html = '';
$.ajax({
    type: 'POST',
    url: "/" + language + "/getSlider",
    data: {
        _token: $("meta[name=csrf-token]").attr("content")
    },
    success: function (sliders) {
        sliders.d.forEach(element => {
            html = html + `
                 <div class="slide" style="margin-top: -150px;">
                    <div class="row align-items-center m-2">
                        <div class="col-12 col-md-5 col-lg-6 order-md-2 animate__animated animate__fadeInRight">
                            <img  src=" ` + element.imgs + ` " alt="` + element.title + `">
                        </div>
                        <div class="col-12 col-md-7 col-lg-6 order-md-1 animate__animated animate__fadeInDown">
                            <p class="lead text-center text-md-left text-muted mb-6 mb-lg-8">
                                ` + element.descr + `
                            </p>
                            <h3 class="display-4 text-center text-md-left text-primary">` + element.descr + `
                            </h3>

                            <div class="text-center text-md-left mt-3">
                                <a href="` + "/" + language + "/" + getMlBlogUrl(language, "product") + `/` + element.slug + `" class="btn btn-primary hvr-icon-forward">
                                    <span class="material-icons hvr-icon">chevron_right</span>
                                    ` + element.button_text + `
                                </a>
                            </div>
                        </div>
                    </div>
                </div>`;


        });
        $('.slide_group').html(html);

    }

}).then(() => {
    $('.slider').each(function () {
        var $this = $(this);
        var $group = $this.find('.slide_group');
        var $slides = $this.find('.slide');
        var bulletArray = [];
        var currentIndex = 0;
        var timeout;

        function move(newIndex) {
            var animateLeft, slideLeft;
            advance();
            if ($group.is(':animated') || currentIndex === newIndex) {
                return;
            }
            slideLeft = '100%';
            animateLeft = '-100%';

            $slides.eq(newIndex).css({
                display: 'block',
                left: slideLeft
            });
            $group.animate({
                left: animateLeft
            }, function () {
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
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                if (currentIndex < ($slides.length - 1)) {
                    move(currentIndex + 1);
                } else {
                    move(0);
                }
            }, 4000);
        }

        $('.slider').on('mouseover', function () {
            clearTimeout(timeout);
        });

        $('.slider').on('mouseout', function () {
            advance();
        });

        $('.next_btn').on('click', function () {
            if (currentIndex < ($slides.length - 1)) {
                move(currentIndex + 1);
            } else {
                move(0);
            }
        });

        $('.previous_btn').on('click', function () {
            if (currentIndex !== 0) {
                move(currentIndex - 1);
            } else if (currentIndex === 0) {
                move($slides.length - 1);
            } else {
                return false;
            }
        });
        advance();

    });
});
$('.jobs, .plaque, .building, .towns, #usagetype, #year select, .selects').select2();
var first = $(".slider .slide_viewer .slide").first().css("display", "block");

var url = {
    "tr": "gonderi",
    "en": "post",
}
$.ajax({
    url: "/" + language + "/getBlogs",
    method: "POST",
    data: {
        _token: $("meta[name=csrf-token]").attr("content")
    },
    success: function (response) {
        response.map(function (blog) {
            $("#blogs").prepend(`
                       <div class="col-lg-4 col-md-6">
                            <div class="blog-3 aos-init aos-animate" data-aos="fade-up">
                                <div class="blog-photo">
                                    <img class="img-fluid lazy" src="${blog.imgs}"
                                         data-src="${blog.imgs}" alt="${blog.title}" width="350" height="232">
                                </div>
                                <div class="detail">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <h3 class="blog-title"><a
                                                    href="/${language}/blog/${getMlBlogUrl(language, "blog")}/${blog.slug}">${blog.title}</a>
                                            </h3>
                                            <p>${blog.descr.substring(0, 170)}</p>
                                        </div>

                                        <div class="col-md-12" style="position: absolute; bottom: 0;">
                                            <a style="position: absolute; right: 35px; bottom:10px"
                                               href="/${language}/blog/${getMlBlogUrl(language, "blog")}/${blog.slug}">
                                                ${getMlBlogUrl(language, "readmore")} <i class="hvr-icon-forward material-icons">keyboard_arrow_right</i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                `)
        });
        AOS.init();
    }
})
